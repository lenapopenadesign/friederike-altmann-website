<?php
/**
 * Kontaktformular-Handler für friederikealtmann.de
 * Nimmt POST vom Modal-Formular entgegen, validiert, sendet Mail an post@friederikealtmann.de
 */

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ---------- Honeypot (versteckt im HTML — Bots füllen's aus) ----------
$honeypot = trim($_POST['website'] ?? '');
if ($honeypot !== '') {
    // Silently succeed for bots
    echo json_encode(['ok' => true]);
    exit;
}

// ---------- Eingaben lesen + validieren ----------
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$type    = trim($_POST['type'] ?? 'allgemein');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Bitte alle Pflichtfelder ausfüllen.']);
    exit;
}

if (strlen($name) > 200 || strlen($message) > 5000 || strlen($email) > 200) {
    http_response_code(400);
    echo json_encode(['error' => 'Eingaben zu lang.']);
    exit;
}

// Anti-Header-Injection: keine Zeilenumbrüche in name/email
if (preg_match('/[\r\n]/', $name . $email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige Eingabe.']);
    exit;
}

// ---------- Typ-Labels ----------
$types = [
    'einzel'    => 'Das Einzel',
    'prozess'   => 'Der Prozess',
    'gruppe'    => 'Die Gruppe',
    'b2b'       => 'B2B Anfrage',
    'allgemein' => 'Allgemeine Frage',
];
$typeLabel = $types[$type] ?? 'Allgemeine Frage';

// ---------- Mail bauen ----------
$to      = 'post@friederikealtmann.de';
$subject = '[Website] ' . $typeLabel . ' — ' . $name;

$body  = "Neue Anfrage über das Kontaktformular auf friederikealtmann.de\n";
$body .= str_repeat('-', 60) . "\n\n";
$body .= "Name:    $name\n";
$body .= "E-Mail:  $email\n";
$body .= "Thema:   $typeLabel\n\n";
$body .= str_repeat('-', 60) . "\n";
$body .= "Nachricht:\n\n";
$body .= $message . "\n\n";
$body .= str_repeat('-', 60) . "\n";
$body .= "Hinweis: Antwort auf diese Mail geht direkt an $email.\n";

// From: noreply auf eigener Domain. Reply-To zeigt auf Absender.
$fromName  = 'Website Friederike Altmann';
$fromEmail = 'noreply@friederikealtmann.de';

$encodedSubject  = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$encodedFromName = '=?UTF-8?B?' . base64_encode($fromName) . '?=';
$encodedReplyName = '=?UTF-8?B?' . base64_encode($name) . '?=';

$headers  = "From: $encodedFromName <$fromEmail>\r\n";
$headers .= "Reply-To: $encodedReplyName <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";

// Envelope-Sender setzen (Return-Path) damit Bounces sauber zurückkommen
$additional = '-f' . $fromEmail;

$ok = @mail($to, $encodedSubject, $body, $headers, $additional);

if ($ok) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Senden fehlgeschlagen. Bitte direkt per E-Mail an post@friederikealtmann.de schreiben.'
    ]);
}
