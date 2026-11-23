// Dag 5: Funktioner som kopplar händelser (events). Gör testerna gröna på tests.html.
import type { Filter } from './typer'
// Båda använder EVENT DELEGATION: EN lyssnare på parent, inte en per knapp.

// 1. grupp är elementet som innehåller filterknapparna: <button data-filter="bakverk" aria-pressed="false">
//    Vid klick på en knapp (eller något inuti den):
//      - sätt aria-pressed="true" på knappen som klickades och "false" på alla andra knappar i gruppen
//      - anropa vidVal(knappens data-filter)
//    Klick på något annat i gruppen ska inte göra något.
//    Tips: handelse.target.closest('button[data-filter]')
export function kopplaFilter(
    grupp: HTMLElement,
    vidVal: (filter: Filter) => void
): void {
    // TODO
    grupp.addEventListener('click', (e) => {
        if (!(e.target instanceof HTMLElement)) return
        const button = e.target.closest<HTMLElement>('button[data-filter]')
        if (!button || !grupp.contains(button)) return

        const filter = button.dataset.filter
        if (
            filter !== 'alla' &&
            filter !== 'vegetarisk' &&
            filter !== 'bakverk' &&
            filter !== 'dryck' &&
            filter !== 'lunch'
        ) {
            return
        }
        grupp
            .querySelectorAll<HTMLButtonElement>('button[data-filter]')
            .forEach((buttons) => {
                buttons.setAttribute('aria-pressed', 'false')
            })
        button.setAttribute('aria-pressed', 'true')
        vidVal(filter)
    })
}

// 2. container innehåller kort med knappar: <button class="lagg-i-order" data-id="3">
//    Vid klick på en sådan knapp: anropa vidLaggTill(id) där id är ett TAL (dataset ger text!).
//    Klick på något annat ska inte göra något.
export function kopplaLaggTill(
    container: HTMLElement,
    vidLaggTill: (id: number) => void
): void {
    // TODO
    container.addEventListener('click', (e) => {
        if (!(e.target instanceof HTMLElement)) return

        const button = e.target.closest<HTMLButtonElement>(
            'button.lagg-i-order'
        )
        if (!button || !container.contains(button)) return

        const id = Number(button.dataset.id)
        if (Number.isNaN(id)) return
        vidLaggTill(id)
    })
}
