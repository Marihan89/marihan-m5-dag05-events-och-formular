// Dag 5 (fördjupning): Beställningen som data. En order är en array: [{ id: 1, antal: 2 }, ...]
import type { OrderRad } from './typer'
// Alla funktioner ska returnera NYA arrayer och aldrig ändra order de får in.

// Lägg till en rätt. Finns id redan i ordern: öka antal med 1. Annars lägg till { id, antal: 1 }.
export function laggTillIOrder(order: OrderRad[], id: number): OrderRad[] {
    // // TODO
    let orderlist = order.map((m) => ({ ...m }))

    let exist = orderlist.findIndex((item) => item.id === id)
    if (exist >= 0) {
        orderlist.map((o) => (o.id === id ? (o.antal += 1) : o.antal))
    } else {
        orderlist.push({ id, antal: 1 })
    }

    return orderlist
}

// En tom order.
export function rensaOrder(): OrderRad[] {
    // TODO

    return []
}

// Totala antalet varor i ordern (summan av alla antal).
export function antalIOrder(order: OrderRad[]): number {
    // TODO
    let count = 0
    order.map((y) => (count += y.antal))
    return count
}
