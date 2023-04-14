const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Nft Marketplace Test", () => {
          let nftMarketplace, basicNft, deployer, player
          const PRICE = ethers.utils.parseEther("0.1")
          const TOKEN_ID = 0
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              player = (await getNamedAccounts()).player

              await deployments.fixture(["all"])
              nftMarketplace = await ethers.getContract("NftMarketplace")
              basicNft = await ethers.getContract("BasicNft")
              await basicNft.mintNft()
              await basicNft.approve(nftMarketplace.address, TOKEN_ID)
          })

          it("lists and can be bought", async () => {
              // list item
              const signerOfPlayer = ethers.provider.getSigner(player)
              await nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE)
              console.log("Listing done!")
              // buy item
              const playerConnectedMarketplace = nftMarketplace.connect(signerOfPlayer)
              await playerConnectedMarketplace.buyItem(basicNft.address, TOKEN_ID, { value: PRICE })
              console.log("buy done!")
              // check owner of NFT
              const newOwner = await basicNft.ownerOf(TOKEN_ID)
              const deployerProceeds = await nftMarketplace.getProceeds(deployer)
              console.log("check done!")
              console.log("newOwner.toString(): " + newOwner.toString())
              console.log("signerOfPlayer: " + player)

              assert(newOwner.toString() == player)
              assert(deployerProceeds.toString() == PRICE.toString())
          })
      })
