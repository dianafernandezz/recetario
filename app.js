let recetas = [
    {
        id: 1,
        nombre: "Torta de Naranja",
        categoria: "Tortas y Tartas",
        ingredientes: [
            "100 gramos de manteca",
            "3 huevos",
            "1 taza de azúcar",
            "2 tazas de harina",
            "Media taza de leche",
            "Ralladura de una naranja",
            "Jugo de una naranja",
            "Esencia de vainilla"
        ],
        pasos: "Batir la manteca con la azúcar, luego incorporar uno a uno los huevos y agregar la esencia de vainilla. Agregar la ralladura de naranja and el jugo de la naranja y mezclarlo. Agregar la leche y seguimos mezclando. Por último agregar la harina. Hornear en horno precalentado a 250 grados aproximadamente por 40 minutos."
    },
    {
        id: 2,
        nombre: "Alfajores de Maicena",
        categoria: "Masas y Masitas",
        ingredientes: [
            "125 grs de manteca pomada", 
            "75 grs de azúcar", 
            "Esencia de vainilla", 
            "1 huevo", 
            "150 grs de Maizena", 
            "90 grs de harina 0000", 
            "1 cdta de polvo de hornear"
        ],
        pasos: "Agregar en un bowl la manteca pomada junto con la azúcar. Integrar bien hasta cremar, listo el cremado agregar la esencia de vainilla volver a integrar y agregar un huevo luego de integrar todo agregar los secos. Agregarlo de a poco hasta formar una masa no amasar, envolver en film y meter en la heladera por una hora aprox. Cocinar en horno pre calentado a 200 grados por 10 minutos."
    }
];

const formReceta = document.getElementById('formReceta');
const contenedorRecetas = document.getElementById('contenedorRecetas');
const txtBuscar = document.getElementById('txtBuscar');
const msgVacio = document.getElementById('msgVacio');

actualizarRecetas(recetas);

formReceta.addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('txtNombre').value.trim();
    const categoria = document.getElementById('cmbCategoria').value;
    const ingredientesRaw = document.getElementById('txtIngredientes').value;
    const pasos = document.getElementById('txtPasos').value.trim();

    const ingredientes = ingredientesRaw.split(',')
                                        .map(ing => ing.trim())
                                        .filter(ing => ing !== '');

    const nuevaReceta = { id: Date.now(), nombre, categoria, ingredientes, pasos };
    recetas.push(nuevaReceta);
    actualizarRecetas(recetas);
    formReceta.reset();
    txtBuscar.value = '';
});

txtBuscar.addEventListener('input', function() {
    const termino = txtBuscar.value.toLowerCase().trim();
    const recetasFiltradas = recetas.filter(r => {
        const coincideNombre = r.nombre.toLowerCase().includes(termino);
        const coincideIngrediente = r.ingredients = r.ingredientes.some(ing => ing.toLowerCase().includes(termino));
        return coincideNombre || coincideIngrediente;
    });
    actualizarRecetas(recetasFiltradas);
});

function actualizarRecetas(listaDeRecetas) {
    contenedorRecetas.innerHTML = '';
    if (listaDeRecetas.length === 0) {
        contenedorRecetas.appendChild(msgVacio);
        msgVacio.classList.remove('d-none');
        return;
    } else {
        msgVacio.classList.add('d-none');
    }

    listaDeRecetas.forEach(r => {
        const col = document.createElement('div');
        col.className = "col-md-6"; 

        let badgesIngredientes = r.ingredientes.map(ing => 
            `<span class="badge bg-light text-dark border me-1 mb-1"><i class="bi bi-circle-fill text-warning small" style="font-size: 0.5rem;"></i> ${ing}</span>`
        ).join('');

        let pasosArray = r.pasos.split('.');
        let htmlPasos = '';
        let contadorPasos = 1;

        pasosArray.forEach(paso => {
            let pasoLimpio = paso.trim();
            if (pasoLimpio.length > 0) {
                htmlPasos += `
                    <div class="mb-2">
                        <strong class="text-sweet">Paso ${contadorPasos}:</strong> 
                        <span class="text-muted">${pasoLimpio}.</span>
                    </div>`;
                contadorPasos++;
            }
        });

        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title text-dark mb-0 fw-bold"><i class="bi bi-cookie text-warning"></i> ${r.nombre}</h5>
                        <span class="badge bg-warning-subtle text-dark border border-warning-subtle">${r.categoria}</span>
                    </div>
                    <h6 class="text-muted small mt-2 mb-2">Ingredientes requeridos:</h6>
                    <div class="mb-3">${badgesIngredientes}</div>
                    <div class="accordion mt-auto" id="accordion-${r.id}">
                        <div class="accordion-item border-0 bg-light">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed py-2 fw-semibold text-secondary bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${r.id}">
                                    <i class="bi bi-receipt-cutoff me-2"></i> Ver Modo de Preparación
                                </button>
                            </h2>
                            <div id="collapse-${r.id}" class="accordion-collapse collapse" data-bs-parent="#accordion-${r.id}">
                                <div class="accordion-body bg-white border-top small p-3">${htmlPasos}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedorRecetas.appendChild(col);
    });
}