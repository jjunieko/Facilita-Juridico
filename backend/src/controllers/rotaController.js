const calcularRotaOtimizada = async (req, res) => {
    try {
        const { clientes } = req.body;

        // Adicione a empresa (0,0) como ponto de partida
        const pontos = [{ coordenada_x: 0, coordenada_y: 0 }, ...clientes];

        // Calcule a rota otimizada usando o algoritmo TSP
        const { rotaOtimizada, distanciaTotal } = calcularRotaTSP(pontos);

        res.json({ rotaOtimizada, distanciaTotal });
    } catch (error) {
        console.error('Erro ao calcular rota otimizada:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const calcularRotaTSP = (pontos) => {
    // Retorne a ordem otimizada dos clientes e a distância total
    return { rotaOtimizada: pontos.slice(1), distanciaTotal: calcularDistanciaTotal(pontos) };
};

const calcularDistanciaTotal = (pontos) => {
    let distanciaTotal = 0;
    for (let i = 1; i < pontos.length; i++) {
        const distancia = calcularDistanciaEntrePontos(pontos[i - 1], pontos[i]);
        distanciaTotal += distancia;
    }
    return distanciaTotal;
};

const calcularDistanciaEntrePontos = (pontoA, pontoB) => {
    // Implemente o cálculo da distância entre dois pontos
    const distancia = Math.sqrt((pontoB.coordenada_x - pontoA.coordenada_x) ** 2 + (pontoB.coordenada_y - pontoA.coordenada_y) ** 2);
    return distancia;
};

module.exports = { calcularRotaOtimizada };