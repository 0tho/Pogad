(function ( ) {

    var PESQUISA_INICIAL = 'perfil conjunto';

    function Controlador ( modelo, visao ) {        
        this.modelo = modelo;
        this.visao = visao;        

        this.visao.iniciarEvent.onEventCall(this.aoIniciar, this);
        this.visao.carregarCursoEvent.onEventCall(this.aoSelecionarCurso, this);
        this.visao.checkboxCliqueEvent.onEventCall(this.aoClicarEmDisciplina, this);

        this.modelo.carregarCursoEvent.onEventCall(this.aoCarregarCurso, this);
        this.modelo.carregarListaDeCursosEvent.onEventCall(this.aoCarregarListaDeCursos, this);
        this.modelo.pesquisaProcessadaEvent.onEventCall(this.aoProcessarPesquisa, this);
        this.modelo.itemsModificadosEvent.onEventCall(this.aoModificarDisciplina, this);
    }   

    Controlador.prototype.aoIniciar = function ( caminho ) {
        console.log("Controlador: " + caminho);

        if( caminho ){
            this.aoSelecionarCurso( caminho );            
        } else {
            this.modelo.carregarListaDeCursos( );
        }
    };

    Controlador.prototype.aoCarregarListaDeCursos = function ( sucesso, listaDeCursos ) {
        if( sucesso ){
            this.visao.iniciarSelecaoDeCurso( listaDeCursos );
        }else{
            throw new Error( 'Erro: Arquivo de setup não encontrado ou inválido.\nPor favor reporte esse em https://github.com/0tho/Pogad/issues' );
        }
    };

    Controlador.prototype.aoCarregarCurso = function ( sucesso, curso ) {
        if( sucesso ){
            this.visao.iniciarListagemDoCurso( curso );
            this.visao.definirPesquisa( PESQUISA_INICIAL );
            this.modelo.processarPesquisa( PESQUISA_INICIAL );
        }else {
            this.modelo.carregarListaDeCursos( );
        }
    }

    Controlador.prototype.aoSelecionarCurso = function ( caminho ) {
        this.modelo.carregarCurso( caminho );        
    };

    Controlador.prototype.aoClicarEmDisciplina = function ( id ) {
        this.modelo.interagirComDisciplina( id );
    };

    Controlador.prototype.aoProcessarPesquisa = function ( obj ) {
        this.visao.fazerLista( obj );
    };
    Controlador.prototype.aoModificarDisciplina = function ( disciplinas ) {
        this.visao.atualizarDisciplinas( disciplinas );
    };


    window.Pogad = window.Pogad || {};
    window.Pogad.Controlador = Controlador;
})();