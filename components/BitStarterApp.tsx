"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

// ABI simplificado del contrato (copia del contrato compilado)
const BITSTARTER_ABI = [
  "function createProject(string,string,uint256,string[],uint256[],uint256[]) public",
  "function fundProject(uint256) public payable",
  "function getProject(uint256) public view returns(address,string,string,uint256,uint256,uint256,bool)",
  "function projectCount() public view returns(uint256)",
];

const CONTRACT_ADDRESS = "0xTuContratoDesplegado"; // Reemplaza con la dirección real

export default function BitStarterApp() {
  const [account, setAccount] = useState<string>("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const bitStarterContract = new ethers.Contract(CONTRACT_ADDRESS, BITSTARTER_ABI, signer);
      setContract(bitStarterContract);
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    }
  };

  const loadProjects = async () => {
    if (contract) {
      const count = await contract.projectCount();
      const projectList = [];
      for (let i = 1; i <= count; i++) {
        const project = await contract.getProject(i);
        projectList.push(project);
      }
      setProjects(projectList);
    }
  };

  const createProject = async () => {
    if (contract) {
      // Ejemplo: Crear un proyecto con 3 etapas
      const tx = await contract.createProject(
        "Mi Proyecto",
        "Descripción",
        ethers.utils.parseEther("100"), // Total goal
        ["Inicio", "Medio", "Final"],
        [ethers.utils.parseEther("10"), ethers.utils.parseEther("50"), ethers.utils.parseEther("40")], // Goals por etapa
        [1735689600, 1738368000, 1740787200] // Deadlines (ejemplo)
      );
      await tx.wait();
      loadProjects();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">BitStarter - Crowdfunding On-Chain</h1>
      {!account ? (
        <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded">
          Conectar Wallet
        </button>
      ) : (
        <p>Conectado: {account}</p>
      )}
      <button onClick={loadProjects} className="bg-green-500 text-white px-4 py-2 rounded ml-4">
        Cargar Proyectos
      </button>
      <button onClick={createProject} className="bg-purple-500 text-white px-4 py-2 rounded ml-4">
        Crear Proyecto de Ejemplo
      </button>
      <div className="mt-8">
        <h2 className="text-xl">Proyectos:</h2>
        {projects.map((project, index) => (
          <div key={index} className="border p-4 mt-2">
            <h3>{project[1]}</h3>
            <p>{project[2]}</p>
            <p>Meta: {ethers.utils.formatEther(project[3])} ETH</p>
          </div>
        ))}
      </div>
    </div>
  );
}