const { ethers } = require("hardhat");

async function main() {
  console.log("Desplegando BitStarter en Moonbase Alpha (testnet Paseo de Polkadot)...");

  const BitStarter = await ethers.getContractFactory("BitStarter");
  const bitStarter = await BitStarter.deploy();

  await bitStarter.deployed();

  console.log("BitStarter desplegado en:", bitStarter.address);
  console.log("Verifica en: https://moonbase.moonscan.io/address/" + bitStarter.address);

  // Opcional: Configurar la plataforma (reemplaza con tu dirección)
  // await bitStarter.setPlatform("0xTuDireccionDePlataforma");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });