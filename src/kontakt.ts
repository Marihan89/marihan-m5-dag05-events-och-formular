// Dag 5: Bokningsformuläret. Kopplas på kontakt.html.
import {
    valideraNamn,
    valideraEpost,
    valideraTelefon,
    valideraDatum,
    valideraAntal,
    valideraFormular,
    dagensDatum
} from './validering'

import { hamta } from './dom'

type Falt = HTMLInputElement | HTMLSelectElement

const form = hamta<HTMLFormElement>('#bokningsform')
const bekraftelse = hamta('#bekraftelse')

// elements.namedItem ger Element | RadioNodeList | null. Vi kollar att det är ett fält vi känner igen.
function hittaFalt(namn: string): Falt {
    const falt = form.elements.namedItem(namn)
    if (falt instanceof HTMLInputElement || falt instanceof HTMLSelectElement) {
        return falt
    }
    throw new Error(`Fältet ${namn} saknas i formuläret`)
}

// Vilken regel hör till vilket fält? Nyckeln är fältets name-attribut.
const regler: Record<string, (text: string) => string> = {
    namn: valideraNamn,
    epost: valideraEpost,
    telefon: valideraTelefon,
    datum: (text: string) => valideraDatum(text, dagensDatum()),
    antal: valideraAntal
}

// 1. visaFel(falt, meddelande): visa ett felmeddelande under fältet.
//    - Finns det inget <p class="falt-fel" id="NAMN-fel"> efter fältet? Skapa det (insertAdjacentElement("afterend", p)).
//    - p.textContent = meddelande
//    - Är meddelandet tomt: ta bort aria-invalid och aria-describedby från fältet.
//      Annars: falt.setAttribute("aria-invalid", "true") och aria-describedby = p:ts id.
function visaFel(falt: Falt, meddelande: string): void {
    // TODO
    const id = `${falt.name}-id`
    let errorfield = document.getElementById(id)
    if (!errorfield) {
        errorfield = document.createElement('p')
        errorfield.id = id
        errorfield.className = 'falt-fel'
        falt.insertAdjacentElement('afterend', errorfield)
    }
    errorfield.textContent = meddelande
    if (meddelande.length === 0) {
        errorfield.removeAttribute('aria-invalid')
        errorfield.removeAttribute('aria-describedby')
        return
    }
    errorfield.setAttribute('aria-invalid', 'true')
    errorfield.setAttribute('aria-describedby', id)
}
// 2. Koppla varje fält i regler: validera när användaren LÄMNAR fältet ("blur"),
//    och validera på nytt vid "input" men bara om fältet redan är markerat som fel (aria-invalid="true").
// TODO

for (const name in regler) {
    const r = regler[name]
    const field = hittaFalt(name)

    field.addEventListener('blur', () => {
        visaFel(field, r(field.value))
    })

    field.addEventListener('input', () => {
        if (field.getAttribute('(aria-invalid') === 'true')
            visaFel(field, field.value)
    })
}

// 3. Vid "submit": preventDefault(). Validera hela formuläret med valideraFormular.
//    - Finns fel: visa dem alla med visaFel, flytta fokus till första felaktiga fältet.
//    - Annars: skriv "Tack! Vi bekräftar din bokning inom ett dygn." i #bekraftelse och töm formuläret (form.reset()).
//    Tips: new FormData(form) ger fält av typen string | File. valideraFormular vill ha Record<string, string>,
//    så loopa och ta bara värden där typeof varde === "string".
//    Använd hittaFalt(namn) för att hämta ett fält med rätt typ.
// TODO

form.addEventListener('submit', (e) => {
    e.preventDefault()
    bekraftelse.textContent = ''

    const vals: Record<string, string> = {}
    for (const [r, v] of new FormData(form)) {
        if (typeof r === 'string') vals[r] = v.toString()
    }
    const failure = valideraFormular(vals, dagensDatum())
    for (const f in failure) {
        visaFel(hittaFalt(f), failure[f] ?? '')
    }

    const firstfailure = Object.keys(failure)[0]
    if (firstfailure) {
        hittaFalt(firstfailure).focus()
        return
    }

    bekraftelse.textContent = 'Tack! Vi bekräftar din bokning inom ett dygn.'
    form.reset()
})
