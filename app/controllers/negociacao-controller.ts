import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

//Utils
import { imprimir } from '../utils/imprimir.js';

//Decorators
import { domInjector } from '../decorators/dom-injector.js';

//Service
import { NegociacoesService } from '../services/negociacoes-service.js';

export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;

    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView', true);
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService();

    constructor() {
        //o querySelector pode retornar um HTMLInputElement ou null. A notação <HTMLInputElement> explicita p/ o compiler tsc que inputData é um HTMLInputElement
        // this.inputData = <HTMLInputElement>document.querySelector('#data');
        // //as HTMLInputElement é outra notação para <HTMLInputElement>
        // this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        // this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        )

        if (!this.ehDiaUtil(negociacao.data)){
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas')
            return;
        }

        this.negociacoes.adiciona(negociacao);
        imprimir(negociacao, this.negociacoes)
        this.limparFormulario();
        this.atualizaView();
    }

    importaDados(): void {
        this.negociacoesService
            .obterNegociacoes()
            .then(negociacoesDeHoje => {
                return negociacoesDeHoje.filter(negociacaoDeHoje => {
                    return !this.negociacoes.lista().some(negociacao => negociacao.ehIgual(negociacaoDeHoje))
                })
            })
            .then(negociacoesDeHoje => {
                for (let negociacao of negociacoesDeHoje){
                    this.negociacoes.adiciona(negociacao)
                }
                this.negociacoesView.update(this.negociacoes)
            })
    }

    public ehDiaUtil(data: Date){
        return data.getDay() > DiasDaSemana.DOMINGO 
            && data.getDay() < DiasDaSemana.SABADO
    }

    public limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(){
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
}
