//llamamos a ready
$(document).ready(function () {
    //evento click
    $("#acordeon").click(function(e){
        e.preventDefault();
        $("#acordeon").empty();
        console.log("funciono como acordeon");
        $("#acordeon").slideDown(1500, function (e) { 
            mostrarAcordeon();
                                    
        } );

    });
    //menu hamburguesa
    const   toggle = document.getElementById('icono-menu');
    const   sidebar = document.getElementById('cont-menu');
        document.onclick = function(e){
            if(e.target.id !== 'cont-menu' && e.target.id !== 'icono-menu')
            {
                toggle.classList.remove('active')
                sidebar.classList.remove('active')
            }
        }
        toggle.onclick = function(){
            toggle.classList.toggle('active');
            sidebar.classList.toggle('active')
        }
        //AJAX
    function mostrarAcordeon(){
        $.get("db.JSON", function(data){
            for(const dato of data){
                $('#resultado').append(`
                                        
                                        <div class="cardH">
                                        <h2 class="cardT">${dato.nombre}</h2>
                                        <p class="cardP"><b>${dato.mascotaN}</b> ${dato.raza}</p>
                                        <p class="cardP">${dato.testimonio}</p>
                                        <p class="cardA">${dato.antiguedad}</p>
                                        </div>
                                    `);
            }
            });
    };
    //ANIMACIONES
    $("#boton1").click(function () {
        $("#formulario").show();
        $("#boton2").click(function (e) {
                            e.preventDefault()
                            $("#registrarme").slideDown(1500);
                                $("#escape").click(function(e){
                                    e.preventDefault();
                                    $("#registrarme").slideUp(1500);
                                    $("#formulario").fadeOut(3000);
                                });
        });
    });
});

//ANIMACION PARA MODAL
$("#modalBtn").click(function(e){
    e.preventDefault()
    $("#modal").slideDown(2500);
        $("#closeBtn").click(function(){
            $("#modal").slideUp(1500);
    })       
})

$("#botonfinal").click(function(e){
    e.preventDefault()
    $(".cont-emergente").show();
        $("#closeBtnEmer").click(function(e){
            e.preventDefault()
            $(".cont-emergente").fadeOut();
            
        })
})

$("#openCloseForm").click(function(e){
    e.preventDefault()
    $("#formQS").slideToggle(2000);
})   