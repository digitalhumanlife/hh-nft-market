// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract NftMarketplace {
    function listItem(address nftAddress, uint256 tokenId, uint256 price) external {}
}

// 1. `listItem`: list NFTs on the marketplace
// 2. `buyItem`: buy the NFTs
// 3. `cancelItem`: Cancel a listing
// 4. `updateListing`: update Price
// 5. `withdrawProceeds`: withdraw payment for my bought NFTs
