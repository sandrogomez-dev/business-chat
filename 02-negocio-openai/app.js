//importar dependencias
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

// cargar configuracion(apikey, port)
dotenv.config();

//cargar express
const app = express();
const PORT = process.env.PORT || 3000;
// servir frontend
app.use("/", express.static("public"));

app.get("/api", (req, res) => {
  res.json({ message: "¡Funciona!" });
});

// middleware para procesar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//instancia de openai y pasar el api key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//ruta /  endpoint / url
app.post("/api/chat", async (req, res) => {
  const context = `
  
  Eres un asistente de soporte para el supermercado "La Bandolera
  Informacion del negocio: 
  - Ubicacion: Avenida Juan Carlos I, 15, 41013 Sevilla
  - Horario: Lunes a Sabado de 9:00 a 21:00, Domingos de 10:00 a 16:00
  - Productos: Alimentos frescos, productos de limpieza, bebidas, snacks, productos de higiene personal, etc.
  - Marcas : Marca blanca "La Bandolera", Coca-Cola, Nestle, Colgate, etc.
  - Metodos de pago: Efectivo, tarjetas de credito y debito, Bizum.
  - Servicios: Entrega a domicilio, recogida en tienda, ofertas semanales, programa de fidelidad.
  Solo puedes responder preguntas relacionadas con el supermercado "La Bandolera" y su informacion.
  Si la pregunta no esta relacionada con el supermercado "La Bandolera", responde con "Lo siento, no puedo ayudarte con eso."`
  

// Servir el backend
app.listen(PORT, () => {
  console.log("Servidor escuchando en http://localhost:" + PORT);
});