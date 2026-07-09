// download-assets.mjs
// Uso: node download-assets.mjs
// Requer Node 18+ (usa fetch nativo)

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ASSETS = [
  {
    url: "https://kingtecvix.com.br/wp-content/uploads/2024/11/logo-kingtech.png",
    dest: "src/assets/logo.png",
  },
  {
    url: "https://kingtecvix.com.br/wp-content/uploads/2025/12/cropped-favicon-1-270x270.png",
    dest: "public/favicon.png",
  },
  {
    // versão em alta resolução (usada como og:image no original)
    url: "https://kingtecvix.com.br/wp-content/uploads/2026/01/note1.jpeg",
    dest: "src/assets/notebooks/note1.jpeg",
  },
  {
    url: "https://kingtecvix.com.br/wp-content/uploads/2026/01/note2-1024x768.jpeg",
    dest: "src/assets/notebooks/note2.jpeg",
  },
  {
    url: "https://kingtecvix.com.br/wp-content/uploads/2026/01/note3-1024x768.jpeg",
    dest: "src/assets/notebooks/note3.jpeg",
  },
  {
    url: "https://kingtecvix.com.br/wp-content/uploads/2026/01/note4-1024x768.jpeg",
    dest: "src/assets/notebooks/note4.jpeg",
  },
  {
    url: "https://kingtecvix.com.br/wp-content/uploads/2026/01/note5-1024x768.jpeg",
    dest: "src/assets/notebooks/note5.jpeg",
  },
];

async function downloadAsset({ url, dest }) {
  const res = await fetch(url, {
    headers: {
      // alguns servidores WP bloqueiam requests sem user-agent de navegador
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    },
  });

  if (!res.ok) {
    throw new Error(`Falha ao baixar ${url} — status ${res.status}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const fullPath = path.resolve(process.cwd(), dest);
  await mkdir(path.dirname(fullPath), { recursive: true });
  await writeFile(fullPath, buffer);
  console.log(`✔ Salvo: ${dest} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

async function main() {
  console.log(`Baixando ${ASSETS.length} arquivos...\n`);

  const results = await Promise.allSettled(ASSETS.map(downloadAsset));

  const failed = results.filter((r) => r.status === "rejected");
  if (failed.length > 0) {
    console.error(`\n${failed.length} arquivo(s) falharam:`);
    failed.forEach((f) => console.error(`  - ${f.reason.message}`));
    process.exitCode = 1;
  } else {
    console.log("\nTodos os assets foram baixados com sucesso.");
  }
}

main();
