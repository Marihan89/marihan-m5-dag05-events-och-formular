// Dag 5: Validering av bokningsformuläret. Rena funktioner, lätta att testa.
// Varje valideraX-funktion tar ett värde (text) och returnerar ett felmeddelande som text,
// eller en tom text "" om värdet är giltigt. Meddelandena står i tests.js.

// Namn: obligatoriskt, minst 2 tecken efter trim().
export function valideraNamn(text: string): string {
    // TODO
    let msg = ''
    if (text.length === 0 || text === '   ') msg = 'Fyll i ditt namn.'
    else if (text.length < 2) msg = 'Namnet måste vara minst 2 tecken.'
    return msg
}

// E-post: obligatorisk, måste innehålla @, och ha formen text@text.text.
export function valideraEpost(text: string): string {
    // TODO
    let msg = ''
    if (text.length === 0) msg = 'Fyll i din e-postadress.'
    else if (!text.includes('@') && !text.includes('.'))
        msg = 'E-postadressen måste innehålla @.'
    else if (!text.includes('@') || !text.includes('.'))
        msg = 'Ange en giltig e-postadress, till exempel namn@exempel.se.'
    else if (!text.includes('.')) msg = 'E-postadressen måste innehålla @.'

    return msg
}

// Telefon: VALFRI (tom text är giltigt). Annars bara siffror, mellanslag, + och -, och minst 7 siffror.
export function valideraTelefon(text: string): string {
    // TODO
    let msg = ''
    if (text.length !== 0 && !/^[0-9 +\-]+$/.test(text))
        msg =
            'Telefonnumret får bara innehålla siffror, mellanslag, plus och bindestreck.'
    else if (text.length < 10 && text.length > 0)
        msg = 'Telefonnumret är för kort.'

    return msg
}

// Datum: obligatoriskt. text och idag är datum som "2026-10-19". Inte före idag.
export function valideraDatum(text: string, idag: string): string {
    // TODO
    let msg = ''
    if (text.length === 0) msg = 'Välj ett datum.'
    if (new Date(idag) > new Date(text))
        msg = 'Datumet kan inte vara i det förflutna.'

    return msg
}

// Antal personer: obligatoriskt (en tom text betyder att inget valts).
export function valideraAntal(text: string): string {
    // TODO
    let msg = ''
    if (text.length === 0) msg = 'Välj antal personer.'
    return msg
}

// Dagens datum som "2026-10-19" (färdig, du behöver inte ändra den).
export function dagensDatum(): string {
    return new Date().toLocaleDateString('sv-SE')
}

// Validera ett helt formulär. varden = { namn, epost, telefon, datum, antal } (texter).
// Returnera ett objekt med BARA de fält som har fel: { namn: "Fyll i ditt namn." }
// Giltigt formulär ger ett tomt objekt {}.
export function valideraFormular(
    varden: Record<string, string>,
    idag: string
): Record<string, string> {
    // TODO
    let output: Record<string, string> = {}
    if (
        valideraNamn(varden['namn']) ||
        valideraTelefon(varden['telefon']) ||
        valideraEpost(varden['epost']) ||
        valideraDatum(varden['datum'], idag) ||
        valideraAntal(varden['antal'])
    ) {
        valideraNamn(varden['namn'])
            ? (output['namn'] = valideraNamn(varden['namn']))
            : {}
        valideraTelefon(varden['telefon'])
            ? (output['telefon'] = valideraTelefon(varden['telefon']))
            : {}
        valideraEpost(varden['epost'])
            ? (output['epost'] = valideraEpost(varden['epost']))
            : {}
        valideraDatum(varden['datum'], idag)
            ? (output['datum'] = valideraDatum(varden['datum'], idag))
            : {}
        valideraAntal(varden['antal'])
            ? (output['antal'] = valideraAntal(varden['antal']))
            : {}
    }
    return output
}
