# proyecto-invitaciones-backend

-Generar archivos html, cuales serán las invitaciones

-Los archivos html contendrá: 	
    
    lógica y estilo,
	Formulario para confirmar asistencia

-Sección donde ingresar con clave y ver dasboard de cada invitación con personas que confirmaron asistencia

-parte administracion se podra:
	
    -iniciar sesion con usuario y contraseña
	-(al momento de iniciar sesion, enviara un correo con codigo de acceso para autenticacion doble factor)
	-generar invitacion
	-eliminar invitacion
	-modificar invitacion

-seccion dashboard de cada cliente(invitacion):

	-modificar invitados
	-agregar invitados
	-

Base de datos:

	usuarioAdministracion: usuario, contraseña
	Invitaciones: id, cliente, invitación(código html)
	Cliente: id, usuarioCliente, planInvitacion, cantidadConfirmados, confirmados

user stories:

	administrador:	
		-ingresar con usuario y contraseña
		-recibir autenticacion para doble factor(en duda si va o no)
		-generar invitacion
		-eliminar invitacion
		-modificar invitacion
	cliente:
		-modificar invitado
		-agregar invitado
		-eliminar invitado
	invitado(visualiza invitacion):
		-ver informacion completa del evento(invitacion)
		-confirmar asistencia por formulario

