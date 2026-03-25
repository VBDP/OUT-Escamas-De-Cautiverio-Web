document.addEventListener('DOMContentLoaded', async () => {
    // Prepar es contenidor per sa resta des rànquing
    const rankingContainer = document.querySelector('.container.px-5.pb-10.mx-auto');
    if (!rankingContainer) return;

    // carregar s'script de s'API
       if (typeof ApiService === 'undefined') {
        console.error("ApiService no carregat. Assegura't que api.js estigui inclòs abans de ranking.js");
        return;
    }

    try {
        const topPlayers = await ApiService.getRanking();
        
        // Fer net es contenidor des rànquing base (jo assumesc que es contenidor principal és sa section amb classe body-font i es div container) (en fran és un tonto)
        rankingContainer.innerHTML = '';

        if (!topPlayers || topPlayers.length === 0) {
            rankingContainer.innerHTML = '<p class="text-center text-xl">No hi ha jugadors en el rànquing encara.</p>';
            return;
        }

        // Separar es top 3 de sa resta
        const podium = topPlayers.slice(0, 3);
        const rest = topPlayers.slice(3);

        // Actualizar es podi
        updatePodium(podium);

        // Renderizar sa resta de jugadors
        rest.forEach((player, index) => {
            const position = index + 4; // Començar a sa posició 4
            const playerCard = document.createElement('div');
            playerCard.className = 'flex items-center w-full lg:w-4/5 mx-auto bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#996666]/50 rounded-2xl p-4 md:p-6 mb-6 transition-all duration-300 transform hover:scale-[1.02] shadow-lg';
            
            playerCard.innerHTML = `
                <!-- Es meu Número -->
                <div class="w-16 h-16 md:w-20 md:h-20 mr-4 md:mr-8 inline-flex items-center justify-center rounded-full flex-shrink-0 bg-gradient-to-br from-[#440150] to-[#1c1414] border border-[#996666]/30 shadow-[0_0_15px_rgba(68,1,80,0.5)]">
                  <span class="text-3xl md:text-4xl font-black text-[#996666]">${position}</span>
                </div>
                
                <!-- Es meu Text -->
                <div class="flex-grow flex justify-between items-center text-left">
                  <h2 class="text-2xl md:text-3xl font-bold text-white pr-4 truncate w-1/2">${player.name || 'Anònim'}</h2>
                  <div class="inline-flex items-center space-x-2 bg-[#9F543E]/20 px-4 py-2 rounded-full border border-[#9F543E]/30 whitespace-nowrap">
                      <span class="text-xl md:text-2xl font-bold text-[#9F543E]">${player.puntuacion || 0}</span>
                      <span class="text-xs md:text-sm text-[#9F543E]/80 uppercase tracking-widest hidden sm:inline">pts</span>
                  </div>
                </div>
            `;
            rankingContainer.appendChild(playerCard);
        });

    } catch (error) {
        console.error('Error carregant el rànquing:', error);
        rankingContainer.innerHTML = '<p class="text-center text-xl text-red-500">Hi ha hagut un error en carregar el rànquing. Torna-ho a provar més tard.</p>';
    }
});

function updatePodium(podium) {
    // Seleccion es div que conté ses cartes des podi
    const podiumContainer = document.querySelector('.mt-20 .flex.items-end');
    if (!podiumContainer) return;

    // S'estructura actual: Plata (2), Or (1), Bronze (3)
    const positionClasses = [
        { bg: 'bg-gradient-to-t from-yellow-700 to-yellow-400 shadow-[0_0_30px_rgba(253,224,71,0.5)]', h: 'h-48 md:h-64', w: 'w-24 md:w-32', num: 1 },  // 1r
        { bg: 'bg-gradient-to-t from-gray-600 to-gray-300 shadow-[0_0_20px_rgba(156,163,175,0.4)]', h: 'h-36 md:h-48', w: 'w-20 md:w-28', num: 2 },    // 2n
        { bg: 'bg-gradient-to-t from-orange-800 to-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)]', h: 'h-28 md:h-36', w: 'w-20 md:w-28', num: 3 }   // 3r
    ];

    // mapeig (índex array podi 0, 1, 2 = 1r, 2n, 3r) a es índexs des DOM (Plata=0, Or=1, Bronze=2)
    const domOrder = [1, 0, 2]; //  1r a s'índex 1 (enmig), es 2n a s'índex 0 (esquerra), es 3r a s'índex 2 (dreta)
    
    // Obtenir es fills actuals o en generar de nous si no existeixen
    podiumContainer.innerHTML = '';

    // Reordenar per renderitzar-ho: 2n, 1r, 3r
    const displayOrder = [];
    if (podium[1]) displayOrder.push({ player: podium[1], style: positionClasses[1] }); // 2n
    if (podium[0]) displayOrder.push({ player: podium[0], style: positionClasses[0] }); // 1r
    if (podium[2]) displayOrder.push({ player: podium[2], style: positionClasses[2] }); // 3r

    displayOrder.forEach(item => {
        const podEl = document.createElement('div');
        podEl.className = 'flex flex-col items-center';
        
        podEl.innerHTML = `
            <div class="${item.style.bg} ${item.style.w} ${item.style.h} rounded-t-[20px] flex flex-col items-center justify-center text-white p-2 md:p-3 text-center border-t border-white/40 transform hover:-translate-y-2 transition-transform duration-300">
              <span class="text-6xl md:text-7xl font-black opacity-90 drop-shadow-lg">${item.style.num}</span>
            </div>
            <div class="mt-5 text-center flex flex-col items-center">
              <span class="text-xl md:text-3xl font-extrabold truncate w-24 md:w-36 text-white drop-shadow-md mb-2">${item.player.name || 'Anònim'}</span>
              <span class="text-sm md:text-lg font-bold bg-[#9F543E]/20 text-[#9F543E] px-4 py-1.5 rounded-full border border-[#9F543E]/40 whitespace-nowrap mb-2">${item.player.puntuacion || 0} pts</span>
            </div>
        `;
        podiumContainer.appendChild(podEl);
    });
}
