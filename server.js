const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta del motor de cálculo para el Diagnóstico
app.get('/api/calcular', (req, res) => {
    const { dia, mes, anio } = req.query;
    
    if (!dia || !mes || !anio) {
        return res.status(400).json({ error: 'Fecha incompleta' });
    }

    // Algoritmo MECF: Reducción armónica de Tesla (3-6-9)
    const suma = Number(dia) + Number(mes) + Number(anio);
    let raiz = suma;
    while (raiz > 9) {
        raiz = String(raiz).split('').reduce((acc, val) => Number(acc) + Number(val), 0);
    }
    
    // Asignación de voltaje energético
    let voltaje = (raiz === 3 || raiz === 6 || raiz === 9) ? raiz : ((raiz % 2 === 0) ? 6 : 3);

    res.json({
        raiz: raiz,
        voltaje: voltaje,
        ventana: "Ciclo Activo 2026 - 2032"
    });
});

// Enrutar cualquier otra petición al index.html principal
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor MECF corriendo en el puerto ${PORT}`);
});
