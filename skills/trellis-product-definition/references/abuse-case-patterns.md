# Abuse-case patterns by archetype (propose; owner ratifies or waives)

| Archetype | Pattern id | Attempt | Must not |
|---|---|---|---|
| auth / sign-in | ABP-01 credential stuffing | automated password attempts | unlimited attempts; no lockout/rate limit |
| auth / sign-in | ABP-02 account enumeration | probe emails via error messages/timing | reveal whether an account exists |
| sign-up | ABP-03 mass registration | scripted account creation | unbounded creation; no verification step |
| password reset | ABP-04 token abuse | reuse/guess reset tokens | token valid beyond single use or short window |
| form | ABP-05 injection | script/SQL in fields | stored or reflected execution |
| form | ABP-06 over-posting | extra fields in payload | writable fields beyond the declared contract |
| detail / list | ABP-07 IDOR | change id in URL | access to another actor's record |
| detail / list | ABP-08 enumeration | sequential ids | bulk discovery of records |
| file upload | ABP-09 malicious file | executable/oversized upload | execution; unbounded storage |
| checkout / financial | ABP-10 price tampering | client-supplied amounts | server trusting client totals |
| any authenticated | ABP-11 privilege escalation | call admin route as user | route without `requires` enforcement |
| any | ABP-12 data leakage | classified field in logs/events/errors | personal/financial/secret in any sink |
