# BitStarter - Crowdfunding On-Chain

Plataforma de crowdfunding validada on-chain en Polkadot testnet (Paseo), similar a Kickstarter pero con validación comunitaria.

## Características

- Creación de proyectos con etapas y metas monetarias.
- Financiamiento por inversores.
- Validación comunitaria (>50%) para liberar fondos.
- Comisiones variables para la plataforma.
- Límites de tiempo por etapa; refund si expira sin validación.

## Despliegue en Testnet Paseo (Polkadot)

1. Configura tu `.env` con `PRIVATE_KEY` y `MOONSCAN_API_KEY` (opcional).
2. Obtén DEV tokens en [Moonbase Faucet](https://faucet.moonbeam.network/).
3. Despliega: `npx hardhat run scripts/deploy.js --network moonbase`.
4. Actualiza `CONTRACT_ADDRESS` en `components/BitStarterApp.tsx`.

## Integración en App

- Conecta wallet (MetaMask) para interactuar.
- Crea proyectos, financia, vota y valida etapas.
- El contrato está integrado en el flujo principal de la app Next.js.

## Comandos

- `npm run dev`: Inicia la app.
- `npx hardhat compile`: Compila contratos.
- `npx hardhat run scripts/deploy.js --network moonbase`: Despliega.

## Notas

- Usa Moonbase Alpha (EVM-compatible en Paseo).
- Asegura compatibilidad con Solidity 0.8.x.
