// preguntas.js
import { db } from "../../firebase-config.js";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const preguntasData = {
  amor: [
    "¿Qué es lo que más te enamora de mí?",
    "¿Cuál fue tu primer pensamiento sobre mí?",
    "Si hiciéramos un viaje romántico, ¿a dónde te gustaría ir?",
  ],
  random: [
    "¿Si fueras un animal, cuál serías y por qué?",
    "¿Qué superpoder te gustaría tener?",
    "¿Cuál es tu serie favorita de todos los tiempos?",
  ],
  traviesas: [
    "¿Cuál es tu pensamiento más travieso cuando me ves?",
    "¿Alguna vez soñaste algo travieso conmigo?",
    "¿Dónde sería tu lugar secreto ideal para besarnos?",
  ],
};

let categoriaActual = "amor";

async function cargarPreguntas() {
  const container = document.getElementById("preguntas-container");
  container.innerHTML = "";

  preguntasData[categoriaActual].forEach((pregunta, index) => {
    const div = document.createElement("div");
    div.classList.add("pregunta");

    div.innerHTML = `
      <p>${pregunta}</p>
      <div class="respuestas">
        <textarea placeholder="Escribe tu respuesta..."></textarea>
        <div class="acciones">
          <button onclick="guardarRespuesta('${pregunta}', this)">💾</button>
          <button onclick="editarRespuesta(this)">✏️</button>
          <button onclick="eliminarRespuesta(this)">🗑️</button>
        </div>
        <div class="reacciones">
          ❤️ <span onclick="ajustarContador(this, 1)">+</span><span class="count">0</span><span onclick="ajustarContador(this, -1)">−</span>
          😂 <span onclick="ajustarContador(this, 1)">+</span><span class="count">0</span><span onclick="ajustarContador(this, -1)">−</span>
          🔥 <span onclick="ajustarContador(this, 1)">+</span><span class="count">0</span><span onclick="ajustarContador(this, -1)">−</span>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

window.cambiarCategoria = (cat) => {
  categoriaActual = cat;
  cargarPreguntas();
};

window.guardarRespuesta = async (pregunta, btn) => {
  const textarea = btn.parentElement.parentElement.querySelector("textarea");
  const texto = textarea.value.trim();

  if (!texto) return;

  try {
    await addDoc(collection(db, "respuestas"), {
      categoria: categoriaActual,
      pregunta: pregunta,
      respuesta: texto,
      fecha: new Date()
    });
    alert("Respuesta guardada 💖");
  } catch (error) {
    console.error("Error al guardar:", error);
  }
};

window.editarRespuesta = (btn) => {
  const textarea = btn.parentElement.parentElement.querySelector("textarea");
  textarea.focus();
};

window.eliminarRespuesta = async (btn) => {
  const container = btn.closest(".pregunta");
  container.remove();
  alert("Respuesta eliminada ❌ (solo visualmente)");
};

window.ajustarContador = (el, valor) => {
  const count = el.parentElement.querySelector(".count");
  let num = parseInt(count.textContent);
  num = Math.max(0, num + valor);
  count.textContent = num;
};

document.addEventListener("DOMContentLoaded", () => {
  cargarPreguntas();
});
