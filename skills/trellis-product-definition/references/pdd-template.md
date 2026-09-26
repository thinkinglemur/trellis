# PDD.md
Version: 1  ·  Owner: <name>

## 1. Overview
<problem · audience · value proposition — owner's words, lightly structured>

## 2. Actors
- <role> — <what they want>          (human)
- <system actor> — <what it does>     (system)

## 3. Feature list
- F-01 <feature> → realised by UC-001, UC-004

## 4. Use cases
UC-001  <name>
Actors:         <primary>; <secondary>; <system>
Preconditions:  <what must be true>
Steps:
  1. <actor> does <action>
     → system <response>
Outcome:        <observable · state-expressed · bounded · testable>
Failure paths:
  F1. At step k, <condition> → <outcome descriptor>
Realises:       F-01
MVP:            yes | no

## 5. Abuse cases
AC-001  <name>
Actor:          attacker | mistaken user
Targets:        UC-001
Attempt:        <steps>
Must not:       <what must not happen>
System does:    <observable response>

## 6. Glossary
- <term> — <definition> (synonyms rejected: …)

## 7. Change log
- v1 · <date> · initial · ratified by owner
- v2 · <date> · <amendment> · proposed by <role> · ratified | amended | rejected | auto
