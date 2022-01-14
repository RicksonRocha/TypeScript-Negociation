export abstract class View<T> { // classe com método abstrato não pode ser instanciada  

    protected elemento: HTMLElement; //protected: somente classe e filhas têm acesso
    private escapar: boolean = false;

    constructor(seletor: string, escapar?: boolean) {
        this.elemento = document.querySelector(seletor);
        if (escapar){
            this.escapar = escapar
        }
    }

    public update(model: T): void {
        let template = this.template(model);
        if (this.escapar){ //para scape de injeção de script
            template = template.replace(/<script>[\s\S]*?<\/script>/, '')
        }
        this.elemento.innerHTML = template;
    }

    protected abstract template(model: T): string; // abstract: a filha classe fica responsável pela implementação do método
}