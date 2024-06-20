const reservas: Reserva[] = [
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    pax: 2,
    noches: 1,
  },
];

interface Reserva {
  tipoHabitacion: "standard" | "suite";
  pax: number;
  noches: number;
}

class HotelReservas {
  private reservas: Reserva[];
  private precioBase: { [key: string]: number };
  private cargoAdicionalPorPersona: number;
  private IVA: number;

  constructor(reservas: Reserva[]) {
    this.reservas = reservas;
    this.precioBase = {
      standard: 100,
      suite: 150,
    };
    this.cargoAdicionalPorPersona = 40;
    this.IVA = 0.21;
  }

  private calcularSubtotal(): number {
    return this.reservas.reduce((subtotal, reserva): number => {
      const precioPorNoche = this.precioBase[reserva.tipoHabitacion];
      const cargosAdicionales =
        (reserva.pax - 1) * this.cargoAdicionalPorPersona;
      const precioTotalPorNoche = precioPorNoche + cargosAdicionales;
      const precioDeLaReserva = precioTotalPorNoche * reserva.noches;
      return subtotal + precioDeLaReserva;
    }, 0);
  }

  public calcularTotal(): number {
    const subtotal = this.calcularSubtotal();
    const total = subtotal * (1 + this.IVA);
    return total;
  }

  public mostrarResumen(): void {
    const subtotal = this.calcularSubtotal();
    const total = this.calcularTotal();
    console.log(`Subtotal: ${subtotal.toFixed(2)} €`);
    console.log(`Total: ${total.toFixed(2)} €`);
  }
}
const reservaCliente = new HotelReservas(reservas);
reservaCliente.mostrarResumen();
