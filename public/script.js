document.getElementById('formRegistro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Validación previa
    if (!nombre || !apellido || !email || !asunto || !mensaje) {
        alert('Por favor, completá todos los campos.');
        return;
    }
    
    const datos = { nombre, apellido, email, asunto, mensaje};

    try {
        const respuesta = await fetch('/api/consulta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (respuesta.ok) {
            alert('¡Registro exitoso!');
        } else {
            alert('Error al registrar');
        }
    } catch (error) {
        alert('Error de conexión con el servidor');
        console.error(error);
    }

});