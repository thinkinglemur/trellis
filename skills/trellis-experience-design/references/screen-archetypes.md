# Screen archetypes and expected affordances
Resolve each expected affordance: present | PDD amendment (owner) | waived: <reason>.
Missing affordances are usually MISSING USE CASES — propose them, don't silently design them.

## auth / sign-in
password recovery · remember me · show/hide password · rate-limit/lockout messaging · alt sign-in (SSO) · link to sign-up · session expiry handling
## sign-up
terms & privacy acceptance · email verification · password rules shown before failure · duplicate-account path · marketing consent (jurisdiction) · link to sign-in
## password reset
token expiry message · single-use token · confirmation on completion · sign-in after reset
## form (create/edit)
inline validation · unsaved-changes guard · disabled submit while pending · server error surfaced per field · cancel path · autosave or explicit save (decide)
## list / index
empty state with primary action · search/filter · sort · pagination or infinite scroll · bulk selection/actions · item status visibility · loading skeleton
## detail
edit path · delete with confirmation · back/breadcrumb · related items · status/history · share/permalink
## settings / profile
save confirmation · destructive actions separated · password/email change with re-auth · notification prefs · data export/delete (jurisdiction) · sign out
## onboarding / first run
skip · progress · resume later · what changed after completing
## checkout / payment
order summary before commit · totals computed server-side · payment failure path · confirmation with reference · receipt/email · refund/cancel path
## search
no-results state with suggestions · recent searches · clear · result count
## notifications / inbox
mark read · empty state · grouping · deep-link to source
## dashboard / overview
empty (no data yet) · time range · refresh/last-updated · drill-down
## modal / popover / drawer
dismiss (esc, outside click) · focus trap · confirm/cancel · scroll within
## error / not found / maintenance
route back · retry · support contact · correlation id
