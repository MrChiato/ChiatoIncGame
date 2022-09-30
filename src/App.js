import { startGame,territoryClick,loadGameClick,deleteSaveClick,saveGameClick } from "./GameFunctions";
import { Container, BuildPanelContainer, TerritoryPanelContainer, BuildingUpgradeContainer,SavePanelContainer } from "./Components/Container.styled";
import Building from "./Components/Building";
import Upgrade from "./Components/Upgrades";
import { StatsText,StatsInfoText,DescText } from "./Components/StyledText.styled"
import  { Button } from "./Components/Button.styled";

const startUnitPrice = 10000;
const startUpgradePrice = 100000;
const startUnitValue = 1;
const versionNumber = "0.0.1"

function App(){
  startGame();
  return (
    <Container>
      <BuildPanelContainer>
        <h2>Army</h2>
        <DescText>Construct buildings to strengthen your army</DescText>
        <StatsText id="moneyText">Cash: $250,000</StatsText>
        <StatsText id="soldiersText">Army strength: 0</StatsText>
        <StatsInfoText id="soldiersPerUpdateText">Army per cycle: 0</StatsInfoText>
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
        <StatsText id="incomeText">Income: $250</StatsText>
        <StatsText id="losesText">Loses per cycle: 0</StatsText>
        <StatsInfoText id="attackCostText">Attacking now will require 1,000 army forces and take 1 army to defend and generate $1,000 income</StatsInfoText>
        <Button onClick={() => territoryClick()}>Take over new Territory</Button>
        <span>Changelog: version: {versionNumber}</span>
        <ul>Changes:
          <li>Updated income calculations (nerf)</li>
          <li>Nerfed upgrades to now only double starting production, not double every production </li>
          <li>Autoloads your progres when refreshing now</li>
          <li>Also loads upgrades text now on load</li>
          <li>Fixed wrong next income calculation</li>
          <li>When entering an amount and clicking buy, the button calculates next price for same amount, instead of price of 1</li>
          <li>Fixed a few bugs</li>
        </ul>
        <SavePanelContainer>
        <Button onClick={() => deleteSaveClick()}>Reset Game</Button>
        </SavePanelContainer>
      </TerritoryPanelContainer>
    </Container>
  )
}
export default App;
