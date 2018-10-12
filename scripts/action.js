var vue = new Vue({
    el: '#app',
    data: {
        sets: [],
        searchs:[],
        energies:[],
        energiesSelecteds:[],
        pokemons:[],
        pokemonSelecteds:[],
        trainers:[],
        trainersSelecteds:[],
        baseApi: 'https://api.pokemontcg.io/v1/',
        searchPoke: 'ui fluid search selection dropdown',
        searchClassTrainer: 'ui fluid search selection dropdown',
        searchClassEnergy: 'ui fluid search selection dropdown',
        pokeSelect:{},
        trainerSelect:{},
        energySelect:{},
        setsFull:'',
        urlSave:''
      },
      methods: {
        addCardPokemon: function (item) {

          /** Se averigua el super tipo **/

          var a = item;

          console.log(a);

          alert('add card|');
        },
        searchPokemon: function(){

          this.pokemons = [];
          var vue = this;
          var searchValue = $('#searchPokemon').val();
          var type = 'Pokémon';
          var temp_values= []
          this.searchPoke = 'ui loading fluid search selection dropdown';
          var url = '';
          var baseApi = this.baseApi;

          if(searchValue.trim().length > 3){

            /**make URL**/
            url = baseApi+'cards?supertype=pokemon&name='+searchValue.trim()+'&setCode='+vue.setsFull;

            $.getJSON( url)
              .done(function( data ) {
                $.each( data.cards, function( i, item ) {

                  $.each( vue.sets, function( j, set ) {
                    if(item.setCode == set.code){
                      item.imgSet=set.symbolUrl;
                    }
                  });
                  
                  vue.pokemons.push(item);                 
                });

                vue.searchPoke = 'ui fluid search selection dropdown';
              });


          }
        },
        selectpokemonDD: function(pokemon){
          this.pokeSelect = pokemon;
          $('.menu').removeClass('visible').addClass('hidden');
        },
        addPokemon: function(){

          var bandera = 0;
          var temp_values = [];

          for (var i = 0; i < this.pokemonSelecteds.length; i++) {

            if(this.pokemonSelecteds[i].id == this.pokeSelect.id){
              bandera ++;


              if(this.pokemonSelecteds[i].cant<4 && this.validateCardName(this.pokemonSelecteds[i].name)){
                this.pokemonSelecteds[i].cant++;
              }
            }

            temp_values.push(this.pokemonSelecteds[i]);
          }

          if(bandera == 0 && this.validateCardName(this.pokeSelect.name) ){
            this.pokeSelect.cant = 1;
            temp_values.push(this.pokeSelect);
            $('#searchPokemon').val('');
          }

          this.pokemonSelecteds = [];
          this.pokemonSelecteds = temp_values;
        },
        searchTrainer: function(){

          this.trainers = [];
          var vue = this;
          var searchValue = $('#searchTrainer').val();
          var type = 'Trainer';
          var temp_values= [];
          var baseApi = this.baseApi;
          this.searchClassTrainer = 'ui loading fluid search selection dropdown';

          if(searchValue.trim().length > 3){


            url = baseApi+'cards?supertype=trainer&name='+searchValue.trim()+'&setCode='+vue.setsFull;

            $.getJSON( url)
              .done(function( data ) {

                var temp_values = [];

                $.each( data.cards, function( i, item ) {

                  $.each( vue.sets, function( j, set ) {
                    if(item.setCode == set.code){
                      item.imgSet=set.symbolUrl;
                    }
                  });

                  if(temp_values.indexOf(item.name) == -1){
                    vue.trainers.push(item);
                    temp_values.push(item.name);

                  }
                  
                                   
                });

                vue.searchClassTrainer = 'ui fluid search selection dropdown';
              });

          }
        },
        selectTrainerDD: function(trainer){
          this.trainerSelect = trainer;
          $('.menu').removeClass('visible').addClass('hidden');
        },
        addTrainer: function(){

          var bandera = 0;
          var temp_values = [];

          for (var i = 0; i < this.trainersSelecteds.length; i++) {

            if(this.trainersSelecteds[i].id == this.trainerSelect.id){
              bandera ++;
              console.log(this.trainersSelecteds[i]);
              if(this.trainersSelecteds[i].cant<4){
                this.trainersSelecteds[i].cant++;
              }
            }

            temp_values.push(this.trainersSelecteds[i]);
          }

          if(bandera == 0 ){
            this.trainerSelect.cant = 1;
            temp_values.push(this.trainerSelect);
            $('#searchTrainer').val('');
          }

          this.trainersSelecteds = [];
          this.trainersSelecteds = temp_values;
        },
        searchEnergy: function(){

          this.energies = [];
          var vue = this;
          var searchValue = $('#searchEnergy').val();
          var type = 'Energy';
          var temp_values= [];
          var baseApi = this.baseApi;
          this.searchClassEnergy = 'ui loading fluid search selection dropdown';

          if(searchValue.trim().length > 3){

            url = baseApi+'cards?supertype=energy&name='+searchValue.trim()+'&setCode='+vue.setsFull;

            $.getJSON( url)
              .done(function( data ) {

                var temp_values = [];

                $.each( data.cards, function( i, item ) {

                  if(temp_values.indexOf(item.name) == -1){
                    vue.energies.push(item);
                    temp_values.push(item.name);
                  }
                  
                                   
                });

                vue.searchClassEnergy = 'ui fluid search selection dropdown';
              });

          }
        },
        selectEnergyDD: function(energy){
          this.energySelect = energy;
          $('.menu').removeClass('visible').addClass('hidden');
        },
        addEnergy: function(){

          var bandera = 0;
          var temp_values = [];

          for (var i = 0; i < this.energiesSelecteds.length; i++) {

            if(this.energiesSelecteds[i].id == this.energySelect.id){
              bandera ++;
             
              if(this.energiesSelecteds[i].subtype == 'Special'){
                if(this.energiesSelecteds[i].cant<4)
                  this.energiesSelecteds[i].cant++;
              } else {
                this.energiesSelecteds[i].cant++;
              }
            }

            temp_values.push(this.energiesSelecteds[i]);
          }

          if(bandera == 0 ){
            this.energySelect.cant = 1;
            temp_values.push(this.energySelect);
            $('#searchEnergy').val('');
          }

          this.energiesSelecteds = [];
          this.energiesSelecteds = temp_values;
        },
        validateCardName:function(name){

          var cant_evaluated = 0;

          this.trainersSelecteds.forEach(function(item){
            if(item.name == name){
              cant_evaluated += item.cant;
            }
          });

          this.pokemonSelecteds.forEach(function(item){
            if(item.name == name){
              cant_evaluated += item.cant;
            }
          });

          this.energiesSelecteds.forEach(function(item){
            if(item.name == name){
              cant_evaluated += item.cant;
            }
          });

          if(cant_evaluated<4){
            return true;
          } else {
            return false;
          }

        },
        plusPokemon: function(index){

          var temp_valued = this.pokemonSelecteds;

          if(this.validateCardName(this.pokemonSelecteds[index].name)){
             temp_valued[index].cant ++;
          }

          this.pokemonSelecteds = [];
          this.pokemonSelecteds =  temp_valued;

        },
        minusPokemon: function(index){
          var temp_valued = this.pokemonSelecteds;

          temp_valued[index].cant --;

          if(temp_valued[index].cant == 0){
            temp_valued.splice(index, 1);
          }

          this.pokemonSelecteds = [];
          this.pokemonSelecteds =  temp_valued;
        },
        plusTrainer: function(index){

          var temp_valued = this.trainersSelecteds;

          if(this.validateCardName(this.trainersSelecteds[index].name)){
             temp_valued[index].cant ++;
          }

          this.trainersSelecteds = [];
          this.trainersSelecteds =  temp_valued;

        },
        minusTrainer: function(index){
          var temp_valued = this.trainersSelecteds;

          temp_valued[index].cant --;

          if(temp_valued[index].cant == 0){
            temp_valued.splice(index, 1);
          }

          this.trainersSelecteds = [];
          this.trainersSelecteds =  temp_valued;
        },
        plusEnergy: function(index){

          var temp_valued = this.energiesSelecteds;

          if(temp_valued[index].subtype == 'Special'){
            if(temp_valued[index].cant<4)
              temp_valued[index].cant++;
          } else {
            temp_valued[index].cant++;
          }

        
          this.energiesSelecteds = [];
          this.energiesSelecteds =  temp_valued;

        },
        minusEnergy: function(index){
          var temp_valued = this.energiesSelecteds;

          temp_valued[index].cant --;

          if(temp_valued[index].cant == 0){
            temp_valued.splice(index, 1);
          }

          this.energiesSelecteds = [];
          this.energiesSelecteds = temp_valued;
        },
        guardar: function(){


          var urlSave = this.urlSave;
          var vue = this;

          var cant_cards = 0;


          vue.pokemonSelecteds.forEach(function(item){

            cant_cards+=item.cant;
          });

          vue.trainersSelecteds.forEach(function(item){
            cant_cards+=item.cant;
          });

          vue.energiesSelecteds.forEach(function(item){
            cant_cards+=item.cant;
          });

        
       
          console.log( cant_cards);

          if(cant_cards != 60){

            alert('El deck no tiene 60 cartas!! ... corrige tu mazo :3');

          } else {
            $.post( urlSave, 
              { 
                nameDeck: $("#nameDeck").val(), 
                pokemons: vue.pokemonSelecteds, 
                trainers: vue.trainersSelecteds, 
                energies: vue.energiesSelecteds,
                idParticipante:$("#participante").val() 
              })
            .done(function() {
              alert( "Guardado Correctamente");
            });
          }

          

        }
      },
      created: function () {
        var sets_found = this.sets;
        var vue = this;

        $.getJSON( "https://api.pokemontcg.io/v1/sets?standardLegal=true", function( data ) {
          data.sets.forEach(function(item){
            sets_found.push(item);
            vue.setsFull +=item.code+'|';
          });

          vue.setsFull = vue.setsFull.slice(0,-1);


        });
      //  alert('hola');

      }
    });

$('.dropdown').dropdown();