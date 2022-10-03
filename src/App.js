import { startGame,territoryClick,deleteSaveClick, attackClick, totalMoney, territoryIncome, armyRequirement } from "./GameFunctions";
import { Container, BuildPanelContainer, TerritoryPanelContainer, BuildingUpgradeContainer,SavePanelContainer,TopContainer } from "./Components/Container.styled";
import Building from "./Components/Building";
import Upgrade from "./Components/Upgrades";
import { StatsText,StatsInfoText,DescText,THText,InfoTable } from "./Components/StyledText.styled"
import  { Button } from "./Components/Button.styled";
import {Input} from "./Components/Forms.styled";

const startUnitPrice = 10000;
const startUpgradePrice = 100000;
const startUnitValue = 1;
const versionNumber = "0.0.2"

export const startingArmyWin = 200000;
export const startingEnemyArmy = 20000;
const startingArmyRequirement = armyRequirement

function App(){
  startGame();
  return (
    <TopContainer>
      <InfoTable>
        <thead id="offlineIncomeText"></thead>
        <thead>
          <tr>
            <THText id="moneyText">Cash: {totalMoney.toLocaleString()}</THText>
            <THText id="incomeText">+ ${territoryIncome}</THText>
            <THText id="soldiersText">Army strength: 0</THText>
            <THText id="soldiersPerUpdateText">+ 0</THText>
          </tr>
        </thead>
        <thead id="offlineArmyText"></thead>
      </InfoTable>
    <Container>
      <BuildPanelContainer>
        <h2>Army</h2>
        <DescText>Construct buildings to strengthen your army</DescText>
        <BuildingUpgradeContainer>
          <Building name="Barrack" amount={1} price={startUnitPrice} value={startUnitValue} type="Army" unit="soldier" ></Building>
          <Upgrade name="Barrack" price={startUpgradePrice}></Upgrade>
        </BuildingUpgradeContainer>
        <BuildingUpgradeContainer>
          <Building name="Shooting Range" amount={1} price={startUnitPrice*50} value={startUnitValue*15} type="Army" unit="Sniper Team" ></Building>
          <Upgrade name="Shooting Range" price={startUpgradePrice*15}></Upgrade>
        </BuildingUpgradeContainer>
        <BuildingUpgradeContainer>
          <Building name="Naval Academy" amount={1} price={startUnitPrice*200} value={startUnitValue*30} type="Army" unit="Navy SEAL" ></Building>
          <Upgrade name="Naval Academy" price={startUpgradePrice*75}></Upgrade>
        </BuildingUpgradeContainer>
        <BuildingUpgradeContainer>
          <Building name="Command School" amount={1} price={startUnitPrice*500} value={startUnitValue*50} type="Army" unit="Military Commander" ></Building>
          <Upgrade name="Command School" price={startUpgradePrice*200}></Upgrade>
        </BuildingUpgradeContainer>
        <BuildingUpgradeContainer>
          <Building name="Workshop" amount={1} price={startUnitPrice*1250} value={startUnitValue*90} type="Army" unit="Armored Vehicle" ></Building>
          <Upgrade name="Workshop" price={startUpgradePrice*350}></Upgrade>
        </BuildingUpgradeContainer>
        <BuildingUpgradeContainer>
          <Building name="Tank Plant" amount={1} price={startUnitPrice*2000} value={startUnitValue*130} type="Army" unit="Tank" ></Building>
          <Upgrade name="Tank Plant" price={startUpgradePrice*500}></Upgrade>
        </BuildingUpgradeContainer>
        <BuildingUpgradeContainer>
          <Building name="Aircraft Plant" amount={1} price={startUnitPrice*5000} value={startUnitValue*250} type="Army" unit="Aircraft" ></Building>
          <Upgrade name="Aircraft Plant" price={startUpgradePrice*1250}></Upgrade>
        </BuildingUpgradeContainer>
        <BuildingUpgradeContainer>
          <Building name="Shipyard" amount={1} price={startUnitPrice*8000} value={startUnitValue*400} type="Army" unit="Hangar Ship" ></Building>
          <Upgrade name="Shipyard" price={startUpgradePrice*2000}></Upgrade>
        </BuildingUpgradeContainer>
        <BuildingUpgradeContainer>
          <Building name="Submarine Station" amount={1} price={startUnitPrice*12500} value={startUnitValue*675} type="Army" unit="Submarine" ></Building>
          <Upgrade name="Submarine Station" price={startUpgradePrice*3250}></Upgrade>
        </BuildingUpgradeContainer>
        <BuildingUpgradeContainer>
          <Building name="Missile Silo" amount={1} price={startUnitPrice*50000} value={startUnitValue*1500} type="Army" unit="Aircraft" ></Building>
          <Upgrade name="Missile Silo" price={startUpgradePrice*17500}></Upgrade>
        </BuildingUpgradeContainer>
        <BuildingUpgradeContainer>
          <Building name="Nuclear Missile Silo" amount={1} price={startUnitPrice*500000} value={startUnitValue*5000} type="Army" unit="Aircraft" ></Building>
          <Upgrade name="Nuclear Missile Silo" price={startUpgradePrice*200000}></Upgrade>
        </BuildingUpgradeContainer>
        <BuildingUpgradeContainer>
          <Building name="Space Station" amount={1} price={startUnitPrice*99999999} value={startUnitValue*99999} type="Army" unit="Orbital Cannon" ></Building>
          <Upgrade name="Space Station" price={startUpgradePrice*9999999}></Upgrade>
        </BuildingUpgradeContainer>
      </BuildPanelContainer>

      <TerritoryPanelContainer>
        <h2>Territory</h2>
        <DescText>Use your army to take over new Territory, this will cost army strength but more territory generates more income.<br/>Owning more territory will also cause soldiers to die by protecting it, causing loses over time</DescText>
        <StatsText id="territoryText">Territory: 1</StatsText>
        <StatsText id="losesText">Loses per cycle: 0</StatsText>
        <StatsInfoText id="attackCostText">Attacking now will require 1,000 army forces and take 1 army to defend and generate $1,000 income</StatsInfoText>
        <Button onClick={() => territoryClick()}>Take over new Territory</Button>
        <StatsText id="warsWonText">Wars won: 0</StatsText>
        <StatsText id="armyWonText">Cash made: $0</StatsText>
        <StatsText id="armyLostText">Army lost: 0</StatsText>
        <DescText>Use your army to attack other nations, you risk losing the army you send.</DescText>
        <StatsInfoText id="armyCostText">Attacking now will require atleast {startingArmyRequirement.toLocaleString()} army forces and win up to ${startingArmyWin.toLocaleString()}. This enemy force has an Army strength of {startingEnemyArmy.toLocaleString()}</StatsInfoText>
        <Input id="armyToSendInput" type="number" placeholder="Army to send.."></Input>
        <DescText id="warResult"></DescText>
        <Button onClick={() => attackClick()}>Attack nation</Button>
        <span>Changelog: version: {versionNumber}</span>
        <ul>Changes:
          <li>Added a new way to use army forces</li>
          <li>Added Offline Income</li>
        </ul>
        <ul>WIP:
          <li>Building price should increase exponentially</li>
          <li>Army income should be able to go minus (It can sometimes with a bug atm)</li>
            <ul>
              <li>If you lose too much army you lose territory and then buildings</li>
              <li>When it goes minus you lose army until you get positive income or lose the game</li>
            </ul>
          <li>Still need a lot of balance changes</li>
          <li>More territory features</li>
          <li>Prestige feature to start on a new planet, reset game or just have a 2nd "tab"</li>
          <li>UI work</li>
            <ul>
              <li>Update UI</li>
              <li>UI Clarity</li>
              <li>Animations and pictures</li>
            </ul>
        </ul>
        <DescText>Join the discord server to discuss the game, give feedback or report bugs :)</DescText>
        <a href="https://discord.gg/6wvUZcsnyt" target="_blank" title="Join the discord server!">
          <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/625e5fcef7ab80b8c1fe559e_Discord-Logo-Color.png"></img>
        </a>
        <SavePanelContainer>
        <Button onClick={() => deleteSaveClick()}>Reset Game</Button>
        </SavePanelContainer>
      </TerritoryPanelContainer>
    </Container>
    </TopContainer>
  )
}
export default App;
