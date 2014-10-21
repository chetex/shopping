
===================================
 ORGANIZACION DEL PROYECTO
===================================

 - Durante ese periodo no solo fue dedicado al proyecto, sino a la investigaci�n de Heroku, google maps api,
 Git, y parte de NodeJs que no conoc�a. Por ello el proyecto se ha quedado en proceso por la falta de tiempo.
 
 - Desde el primer momento realic� un backlog de las tareas que quer�a realizar tipo� el backlog esta escaneado
 en el directorio "doc" y las tareas que me plante� y como resolverlas.
    
     > Documentaci�n a entregar
     > Pruebas que realizar y framework a investigar.
     > Ejecuci�n del proyecto
     > Resumen y documentaci�n a entregar.

 - Los diagramas UML se han realizado con un programa que se llama "Dia"
para MAC OS al no encontrar programas abiertos que ya existen en windows para MAC.

 - Para la base de datos se ha utilizado el programa "PGADMIN" para MAC, y las querys fueron ejecutadas desde
 la linea de comandos de pgsql y el dump realizado desde ah�.
 
=================================
 PASOS REALIZADOS
=================================
 
 1) Instalaci�n de Nodejs y Express
 2) A�adir "stylus" para las vistas en jade y css
 3) Instalar "nodemon" para monitorizar el servidor y las subidas.
 4) A�adir el proyecto a GIT para subirlo a DEV.
 5) Subir a DEV el proyecto (heroku create + "git push heroku master")
 6) Instalar postgresql (npm install pg)
 7) Instalar modulo (ejs).
 8) Realizar mock estructura proyecto en "app.js" y ver que funciona la conexion bbdd
 y llamadas a vistas en Jade.
 9) Pensar y hacer un sistema genrico de arranque para local y para dev.
 10) Montar estructura del proyecto "MVC" y realizar un DAO generco para cualquier llamada a
base de datos.
 11) A�adir a tabla datos de geoposicion X e Y para almacenar posiciones de supermercados,
 y en la query de la base de datos recoger y aadir a la vista. La idea es cuando se pinte un mapa
 guardar la X e Y del punto seleci�nado por el usuario y la siguiente vez, cargar el mapa con esa posici�n.
 12) Instalar "jquery supercookie" una libraria que facilita el almacenamiento de informaci�n en 
 local, para los usuarios no registrados, para que puedan guardar sus compras.
 13) Instalar validate forms, para validar los formularios antes de enviarlos.
 
======================================
 INSTRUCCIONES DESPLIEGUE LOCAL
=====================================

 **** Depende un poco de la m�quina final a instalar ya sea linux, mac os o windows ******

  APP
  - Descomprimir el fichero aplicacion en lugar
  (comando)
  	cd /<place>/
  
  BBDD
  - Instalar en el entorno pssql. Descargar aplicaci�n
	  (de web)
	  	http://postgresapp.com/
	  (en unix ubuntu)
	    sudo apt-get install postgresql-8.2
  - Lanzar script "sql_statements.sql" para montar base de datos
  - El script ya crea la base de datos y tablas y las rellena.
  	  psql -U username -P password -f sql/sql_statements.sql
  
  NODEJS
  - Instalar NodeJS en la m�quina.
  (comando unix con brew)
  	    brew install node
  (comando ubuntu)
        sudo apt-get update
        sudo apt-get install nodejs
  
  >>>> LAUNCH <<<<<<
  - Comando ejecuci�n
  	(node levanta el servidor en el puerto 3000)
      "NODE_ENV=localhost node app.js"
 
 
===============================
 TECNOLOGIAS USADAS
===============================
  - NodeJS + express + nodemon : Hab�a utilizado anteriormente servidores as�ncronos (vertxio) y daban muy buen rendiemiento.
                                 En las �ltimas ocasiones de proyectos realizados hab�a codificado con javascript y me sent�a 
                                 m�s c�mod con toda esta tecnolog�a y quer�a investigar en ella.
  - Postgressql                : De igual manera me interesaba investigar en su rendiemiento, auqnue ana aplicaci�n con 4 tablas
  								 no mide el rendimiento del motor de la base de datos. Plantee hacerlo con mongo, pero quise que
  								 fuera una base de datos relacional.
  - Git                        : Hab�a trabajado con SVN y con CVS, pero nunca con Git. Integraci�n intr�nseca con Heroky y nodeJS
                                 y facilidad de despliegue a Github. Instalar el entorno y hacer un tutorial de apredizaje tambi�n 
                                 dedique tiempo.
  - Jquery supercookie         : Ya hab�a utilizado anteriormente esta librer�a y es facil y c�moda para almacenar datos en el navegador.
                                 Viene un wrap para almacenar objetos JSON que facilitan su extraci�n, almacenamiento etc...
  - Json                       : Envio y almacenamiento de datos en objetos entre cliente y servidor
  - Heroku dev server          : Nunca hab�a hecho deploys de aplicaciones, y su integraci�n con NodeJS y Postgresql me decant� a usarlo.
                                 Es realmente facil deployar una aplicaci�n, previamente en git. Me cost� mas por los comandos encontrar
                                 el acceso a la base de datos y su montaje.
 
  
===============================
 PROBLEMAS ENCONTRADOS
===============================
  - A �ltima hora no he podido actualizar el servidor de dev, ya que me ha dado errores con git, y casi borro 
  el proyecto del repositorio.
  - El realizar la aplicaci�n con NodeJS en un solo punto de entrada, todas las variables son globales y visibles,
  pero al migrarlo a un MVC, ya el paso de par�metros se hizo m�s complicado y tuve que estudiar la arquitectura de 
  node (los "module-exports") para ver como funcionaban, como se ve�an las variables, para intentar hacer un DAO gen�rico
  y facil de usar y poner cada parte de funcionalidad en su lado correspondiente (controladores, modelos, vistas, helpers).
  Una tarea que est� mas que trillada con lenguaje PHP, para hacerlo con una nueva tecnolog�a y con javascript acarreaba
  m�s esfuerzo.


******************************************************************************** 
 EXTRA  
******************************************************************************** 

===============================
 URL CONFIGURACION APP
===============================
  
REPO DEV
    HEROKU_POSTGRESQL_VIOLET_URL: postgres://jgrrcfckcfofeb:LWexuvXRElNl3LC9UwP6VJVkhr@ec2-23-21-89-241.compute-1.amazonaws.com:5432/d6dqq1edpgds2c
    
LOCAL
	http://localhost:3000/
	
PROYECTO EN GIT
	https://github.com/chetex/shopping_final
    
PROYECTO EN DEV (problemas al actualizar con GIT y despues de un rato viendo logs, no vi porque no actualizaba la �ltima version)
                (la versi�n que se ve es una anterior y no navega ni /historial ni /login)
    http://protected-cove-3947.herokuapp.com/
    
 
=================================================
 TAREAS SE HAN QUEDADO PENDIENTES A REALIZAR APP
==================================================
  - Funcionamiento de los formularios. Tanto el de login como el de registro. Por falta de tiempo 
  he dejado la funci�n en el controlador apuntada (app.post('/login', controller.validate_login);).
  - Insertar registro de usuario (app.post('/registro', controller.insertar_registro);) est� apuntado
  en el controlador la llamada para la inserci�n del registro.
  - Google maps api investigado (hw_gmp.html) e integrar en la vista principal. Ten�a investigado en el API
  un m�tedo en el que cada vez que el usuario 
  - Ya est� a�adido la librer�a "supercookie" pero hacer una gesti�n correcta de las compras de un usuario
  no logado (almacenar su informaci�n en la cookie) y luego cuando se logue en la aplicacion, volcar la informaci�n
  de la cookie a la base de datos.
  - Realizar un ANT de despliegue de la app, viendo en que entorno operativo te encuentas, instale el servidor de NodeJS y 
  los modulos necesarios y levante la aplicaci�n en local para su fucionamiento. (�posiblidad de maven con NodeJS?).
  
=============================
 MEJORAS A REALIZAR APP
=============================
   - Sistemas de envio de emails para el login, en el que verifiques que es el usuario final.
   - Aprender "jade" o investigar renderizaci�n desde NODEJS de p�ginas web.. (�quiz�s file System, y mostrarlo en pantalla?)  
   - A�adir el bot�n de "facebook connect" y hacer login en la aplicaci�n con Facebook en lugar de un registro. Igualmente
   con linkedin o otras redes sociales.
   - Investigar el canvas de HTML5 para ver que funcionalidades da para la utilizai�n de formularios y su vista con CSS3.

--------------------------------------------
NEEEEEWWWWWWWWWWW

 - Html5 form element
 - transform html to jade.
 - moment para fechas
 - bbdd mongodb
 - send recovery pasword by email
 - cookie + session
 - 
 
 INSTALAR MEDIANTE PACKAGE
  - en el pakage viene todo, así que dar comando. Solo hace falta, mongo, npm y node.
  
  

   
   
