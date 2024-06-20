import { reservas } from "./reservas-data";

// Añadiendo clase base de reservas
class ReservaBase {
  reservas: Reserva[];
  precios: { [key: string]: number };

  constructor(reservas: Reserva[], precios: { [key: string]: number }) {
    this.reservas = reservas;
    this.precios = precios;
  }

  calcularSubtotal(): number {
    return this.reservas.reduce((subtotal, reserva) => {
      const precioBase = this.precios[reserva.tipoHabitacion];
      const cargosAdicionales = (reserva.pax - 1) * 40;
      const cargoDesayuno = reserva.desayuno
        ? 15 * reserva.pax * reserva.noches
        : 0;
      return (
        subtotal +
        (precioBase + cargosAdicionales) * reserva.noches +
        cargoDesayuno
      );
    }, 0);
  }

  calcularTotal(): number {
    const subtotal = this.calcularSubtotal();
    const iva = subtotal * 0.21;
    return subtotal + iva;
  }
}
//Añadiendo clase hija que hereda métodos sin cambios
class ReservaParticular extends ReservaBase {
  constructor(reservas: Reserva[]) {
    const precios = {
      standard: 100,
      suite: 150,
    };
    super(reservas, precios);
  }
}
//Añadiendo clase para Tour Operadores, poniendo todas las habitaciones a 100 y añadiendo descuento del 0.15
class ReservaTourOperador extends ReservaBase {
  constructor(reservas: Reserva[]) {
    const precios = {
      standard: 100,
      suite: 100,
    };
    super(reservas, precios);
  }

  calcularTotal(): number {
    const subtotal = this.calcularSubtotal();
    const descuento = subtotal * 0.15;
    const subtotalConDescuento = subtotal - descuento;
    const iva = subtotalConDescuento * 0.21;
    return subtotalConDescuento + iva;
  }
}
const clienteParticular = new ReservaParticular(reservas);
console.log(
  "Cliente Particular - Subtotal:",
  clienteParticular.calcularSubtotal()
);
console.log("Cliente Particular - Total:", clienteParticular.calcularTotal());

const tourOperador = new ReservaTourOperador(reservas);
console.log("Tour Operador - Subtotal:", tourOperador.calcularSubtotal());
console.log("Tour Operador - Total:", tourOperador.calcularTotal());
