const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  let counter;

  beforeEach(async function () {
    const Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();
    await counter.deployed();
  });

  it("Should start with 0", async function () {
    expect(await counter.x()).to.equal(0);
  });

  it("Should increment by 1", async function () {
    await counter.inc();
    expect(await counter.x()).to.equal(1);
  });

  it("Should increment by specified amount", async function () {
    await counter.incBy(5);
    expect(await counter.x()).to.equal(5);
  });

  it("Should revert when incrementing by 0", async function () {
    await expect(counter.incBy(0)).to.be.revertedWith("incBy: increment should be positive");
  });
});
