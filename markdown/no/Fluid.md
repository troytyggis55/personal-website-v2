---
date: 2023-10-24
category: coding-adventure
---
Etter å ha sett [Sebastian Lagues video om væskesimulering](https://www.youtube.com/watch?v=rSKMYc1CQHE&list=PLFt_AvWsXl0ehjAfLFsp1PGaatzAwo0uK) ble jeg, som alltid, 
inspirert til å prøve på en enkel versjon selv. Jeg hadde en god aning av hvordan enkel 
vektormatematikk kunne brukes til å simulere et slikt system, ettersom jeg har prøvd meg på lignende prosjekter tidligere.

&nbsp;  

Hvert partikkel har en posisjon, hastighet og akselerasjon. Akselerasjonen beregnes ut fra partikkelens nærhet 
til andre partikler. For å unngå ren θ(n^2)-kompleksitet deles skjermen inn i et rutenett hvor hver rute har 
størrelsen til partikkelens søkeradius. Hver partikkel trenger da bare å søke etter andre partikler i samme 
rute og de 8 omkringliggende rutene. Selv om jeg er ganske sikker på at dette uansett resulterer i en θ(n^2)-kompleksitet
for ekstremt høye partikkeltettheter, optimaliserer denne løsningen ytelsen for denne demoen.