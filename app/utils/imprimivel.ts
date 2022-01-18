//cada classe que implemetns essa interface fica responsável por usa implementação

export interface Imprimivel { //toda interface é abstract
    paraTexto(): string // todo método de interface é public e abstract
}

/* export abstract class Imprimivel {
    // constructor () {} está implícito
    public abstract paraTexto(): string;
} */