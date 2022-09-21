// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Unifarm_assi{
    int256 private  total;
    uint256 private totalContributers;
    mapping(address => int256[]) private accounts;
    uint8 private _decimals = 9;


    /** @notice Add the number t total
    *@param number to be added
    */
    function addNumber(int256 number) public  {
        total=add(total,number);
        if(accounts[msg.sender].length==0){
            totalContributers++;
        }
        accounts[msg.sender].push(number);
    }


    /** @notice Get the total amount
    *   @return the total amount
    */
    function viewTotal() public view  returns(int256 ){
        return total;
    }


    /** @notice Gets the amount that an address has added
     *  @param addingAddress the address of the funder
     *  @return the amount added
     */
    function getAddressToAmountAdded(address addingAddress)
        public
        view
        returns (int256 [] memory )
    {
        return accounts[addingAddress];
    }


    /** @notice Get the total contributers
    *   @return Total Contributers
    */
    function getTotalContributers() public view returns( uint256){
        return totalContributers;
    }

    /** 
    *   @return Returns Decimal
    */
    function decimals() public view returns (uint8) {
        return _decimals;
    }


    /** @notice Function for adding
    *   @return sum
    */
    function add(int256 x, int256 y) public pure returns (int256) {
        int256 z = x + y;
        if (x > 0 && y > 0) assert(z > x && z > y);
        if (x < 0 && y < 0) assert(z < x && z < y);
        return z;
    }


}