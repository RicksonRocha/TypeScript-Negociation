import { Negociacao } from './negociacao.js';
import { Imprimivel } from '../utils/imprimivel.js';

export class Negociacoes implements Imprimivel {
    private negociacoes: Negociacao[] = [];

    public adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    public lista(): readonly Negociacao[] {
        return this.negociacoes;
    }

    public paraTexto(): string {
        return (JSON.stringify(this.negociacoes, null, 2))
    }
}
