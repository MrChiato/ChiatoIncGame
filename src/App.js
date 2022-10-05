import { startGame,territoryClick,deleteSaveClick, attackClick, totalMoney, territoryIncome, armyRequirement } from "./GameFunctions";
import { Container, BuildPanelContainer, TerritoryPanelContainer, SavePanelContainer,TopContainer, TabContainer, TabButtons, TerritoryPanelInnerContainer, BUContainer, SettingsContainer, CheckBoxInput } from "./Components/Container.styled";
import { StatsText,StatsInfoText,DescText,THText,InfoTable, ErrorText, HelpHeaderText, HelpText, UpgradeText, DetailText, HelpHeader2Text } from "./Components/StyledText.styled"
import  { Button, ChangeTabButton, SettingsButton } from "./Components/Button.styled";
import {Input, SaveInput} from "./Components/Forms.styled";
import { EnableDetailedStats, ToggleMaxSetting } from "./SettingsHandling";
import { ArmyInputChange } from "./WarFunctions";
import { Stats } from "./Components/Statistics";
import { LoadStringButton, ShowStringInField } from "./HandleStringSaveLoad";
import { PrestigeBuilder, PrestigeCycleSpeed, PrestigeHalfUnitPrice, PrestigeLevelPress } from "./PrestigeLeveling";

const startUnitPrice = 10000;
const startUpgradePrice = 100000;
const startUnitValue = 1;
const versionNumber = "0.0.6"

export const startingArmyWin = 200000;
export const startingEnemyArmy = 20000;
const startingArmyRequirement = armyRequirement

export let armyPrices = {
  "Barrack": startUnitPrice,
  "Shooting Range": startUnitPrice*50,
  "Naval Academy": startUnitPrice*200,
  "Command School": startUnitPrice*500,
  "Workshop": startUnitPrice*1250,
  "Tank Plant": startUnitPrice*2000,
  "Aircraft Plant": startUnitPrice*5000,
  "Shipyard": startUnitPrice*8000,
  "Submarine Station": startUnitPrice*12500,
  "Missile Silo": startUnitPrice*50000,
  "Nuclear Missile Silo": startUnitPrice*500000,
  "Space Station": startUnitPrice*99999999
}

export let upgradePrices = {
  "Barrack": startUpgradePrice,
  "Shooting Range": startUpgradePrice*15,
  "Naval Academy": startUpgradePrice*75,
  "Command School": startUpgradePrice*200,
  "Workshop": startUpgradePrice*350,
  "Tank Plant": startUpgradePrice*500,
  "Aircraft Plant": startUpgradePrice*1250,
  "Shipyard": startUpgradePrice*2000,
  "Submarine Station": startUpgradePrice*3250,
  "Missile Silo": startUpgradePrice*17500,
  "Nuclear Missile Silo": startUpgradePrice*200000,
  "Space Station": startUpgradePrice*9999999
}

export let startingValues = {
  "Barrack": startUnitValue,
  "Shooting Range": startUnitValue*15,
  "Naval Academy": startUnitValue*30,
  "Command School": startUnitValue*50,
  "Workshop": startUnitValue*90,
  "Tank Plant": startUnitValue*130,
  "Aircraft Plant": startUnitValue*250,
  "Shipyard": startUnitValue*400,
  "Submarine Station": startUnitValue*675,
  "Missile Silo": startUnitValue*1500,
  "Nuclear Missile Silo": startUnitValue*5000,
  "Space Station": startUnitValue*99999
}

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
      <TabButtons>
        <ChangeTabButton name="Buildings"></ChangeTabButton>
        <ChangeTabButton name="Warfare"></ChangeTabButton>
        <ChangeTabButton name="Statistics"></ChangeTabButton>
        <ChangeTabButton bg="rgb(255,215,0)" bs="rgba(215, 215, 0, 1)" name="Prestige"></ChangeTabButton>
        <ChangeTabButton name="Settings"></ChangeTabButton>
        <ChangeTabButton name="Help"></ChangeTabButton>
        <ChangeTabButton name="About"></ChangeTabButton>
      </TabButtons>
    <Container>
      <TabContainer id="Buildings" className="TabContainers">
      <BuildPanelContainer>
        <h2>Army</h2>
        <DescText>Construct buildings to strengthen your army</DescText>
        <BUContainer name="Barrack" amount={1} price={startUnitPrice} upgradePrice={startUpgradePrice} value={startUnitValue} unit="soldier"></BUContainer>
        <BUContainer name="Shooting Range" amount={1} price={armyPrices["Shooting Range"]} upgradePrice={upgradePrices["Shooting Range"]} value={startUnitValue*15} unit="soldier"></BUContainer>
        <BUContainer name="Naval Academy" amount={1} price={armyPrices["Naval Academy"]} upgradePrice={upgradePrices["Naval Academy"]} value={startUnitValue*30} unit="Navy SEAL"></BUContainer>
        <BUContainer name="Command School" amount={1} price={armyPrices["Command School"]} upgradePrice={upgradePrices["Command School"]} value={startUnitValue*50} unit="Navy SEAL"></BUContainer>
        <BUContainer name="Workshop" amount={1} price={armyPrices["Workshop"]} upgradePrice={upgradePrices["Workshop"]} value={startUnitValue*90} unit="Armored Vehicle"></BUContainer>
        <BUContainer name="Tank Plant" amount={1} price={armyPrices["Tank Plant"]} upgradePrice={upgradePrices["Tank Plant"]} value={startUnitValue*130} unit="Tank"></BUContainer>
        <BUContainer name="Aircraft Plant" amount={1} price={armyPrices["Aircraft Plant"]} upgradePrice={upgradePrices["Aircraft Plant"]} value={startUnitValue*250} unit="Aircraft"></BUContainer>
        <BUContainer name="Shipyard" amount={1} price={armyPrices["Shipyard"]} upgradePrice={upgradePrices["Shipyard"]} value={startUnitValue*400} unit="Hangar Ship"></BUContainer>
        <BUContainer name="Submarine Station" amount={1} price={armyPrices["Submarine Station"]} upgradePrice={upgradePrices["Submarine Station"]} value={startUnitValue*675} unit="Submarine"></BUContainer>
        <BUContainer name="Missile Silo" amount={1} price={armyPrices["Missile Silo"]} upgradePrice={upgradePrices["Missile Silo"]} value={startUnitValue*1500} unit="Missiles"></BUContainer>
        <BUContainer name="Nuclear Missile Silo" amount={1} price={armyPrices["Nuclear Missile Silo"]} upgradePrice={upgradePrices["Nuclear Missile Silo"]} value={startUnitValue*5000} unit="Nuclear Missiles"></BUContainer>
        <BUContainer name="Space Station" amount={1} price={armyPrices["Space Station"]} upgradePrice={upgradePrices["Space Station"]} value={startUnitValue*99999} unit="Orbital Cannon"></BUContainer>
      </BuildPanelContainer>
      </TabContainer>

      <TabContainer id="Warfare" className="TabContainers">
      <TerritoryPanelContainer>
        <TerritoryPanelInnerContainer>
        <StatsText id="territoryText">Territory: 1</StatsText>
        <StatsText id="losesText">Loses per cycle: 0</StatsText>
        <DescText>Use your army to take over new Territory, this will cost army strength but more territory generates more income.<br/>Owning more territory will also cause soldiers to die by protecting it, causing losses over time</DescText>
        <StatsInfoText id="attackCostText">Attacking now will require 1,000 army forces and take 1 army to defend and generate $1,000 income</StatsInfoText>
        <ErrorText id="territoryError"></ErrorText>
        <Button onClick={() => territoryClick()}>Take over new Territory</Button>
        </TerritoryPanelInnerContainer>
        <TerritoryPanelInnerContainer>
        <StatsText id="warsWonText">Wars won: 0</StatsText>
        <StatsText id="armyWonText">Cash made: $0</StatsText>
        <StatsText id="armyLostText">Army lost: 0</StatsText>
        <DescText>Use your army to attack other nations, you risk losing the army you send.</DescText>
        <StatsInfoText id="armyCostText">Attacking now will require atleast {startingArmyRequirement.toLocaleString()} army forces and win up to ${startingArmyWin.toLocaleString()}. This enemy force has an Army strength of {startingEnemyArmy.toLocaleString()}</StatsInfoText>
        <Input id="armyToSendInput" type="number" placeholder="Army to send.." onChange={() => ArmyInputChange()}></Input>
        <DescText id="warResult"></DescText>
        <Button onClick={() => attackClick()}>Attack nation</Button>
        </TerritoryPanelInnerContainer>
      </TerritoryPanelContainer>
      </TabContainer>
      <TabContainer id="Settings" className="TabContainers">
        <SettingsContainer>
          <CheckBoxInput type="checkbox" id="detailedSettingsBox" onChange={() => EnableDetailedStats()}/>
          <label>Enable detailed text for buildings and upgrades</label>
        </SettingsContainer>
        <SettingsContainer>
          <CheckBoxInput type="checkbox" id="maxAmountSetting" onChange={() => ToggleMaxSetting()}/>
          <label>Enable max input amount, if you enter a number above current army strength for war <br/>or 999 for buildings, it will automatically set buy amount to max affordable</label>
        </SettingsContainer>
        <SavePanelContainer>
          <SaveInput id="SaveStringInput" readOnly></SaveInput>
          <SettingsButton onClick={() => ShowStringInField()}>Generate Save String</SettingsButton>
        </SavePanelContainer>
        <SavePanelContainer>
          <SaveInput id="LoadStringInput"></SaveInput>
          <ErrorText id="LoadStringBug"/>
          <SettingsButton onClick={() => LoadStringButton()}>Load from String</SettingsButton>
        </SavePanelContainer>
        <SavePanelContainer>
          <Button onClick={() => deleteSaveClick()}>Reset Game</Button>
        </SavePanelContainer>
      </TabContainer>
      <TabContainer id="About" className="TabContainers">
        <span>Changelog: version: {versionNumber}</span>
          <ul>Changes:
            <li>First iteration of a prestige system, balancing and features to come!</li>
            <li>New save system allows to save your saves as a line of text, to share between devices, with friends or for bug reports</li>
            <li>Winning probability added to war feature</li>
            <li>Fixed a bug that did enemy army size wrong (too high), woops!</li>
            <li>Few more bug fixes, thanks guys!</li>
          </ul>
          <BuildPanelContainer>
          <DescText>Join the discord server to discuss the game, give feedback or report bugs :)</DescText>
          <a href="https://discord.gg/6wvUZcsnyt" target="_blank" title="Join the discord server!">
            <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/625e5fcef7ab80b8c1fe559e_Discord-Logo-Color.png"></img>
          </a>
          <DescText>Fund development of this game by buying me a coffee, thanks a lot!</DescText>
          <a href="https://www.buymeacoffee.com/Chiato" target="_blank" title="Buy me a coffee!">
            <img src="https://ps.w.org/buymeacoffee/assets/icon-256x256.png?rev=2424125"></img>
          </a>
          </BuildPanelContainer>
      </TabContainer>
      <TabContainer id="Statistics" className="TabContainers">
        <Stats/>
      </TabContainer>
      <TabContainer id="Help" className="TabContainers">
        <HelpHeaderText>How to play</HelpHeaderText>
        <HelpText>The basics of the game is to build Army strength with buildings.<br/>You then use this Army strength to go to war and earn money, or take over new territory to generate income.<br/>Be careful when you take over territory, you need to have enough army income to sustain the losses of defending the territory<br/>The war feature is a random roll between the army you send and the army the enemy has, whoever rolls higher wins, if you roll higher you will lose army equal to his roll.</HelpText>
      </TabContainer>
      <TabContainer id="Prestige" className="TabContainers">
        <BuildPanelContainer>
        <HelpHeaderText>Prestige! (Beta)</HelpHeaderText>
        <HelpText>The first version of prestige is here! More features will come soon!<br/>You can prestige to reset the game, you get (1) prestige point for every time you prestige. <br/>Prestige points grant very powerful upgrades, allowing you to progres further and faster!<br/>Later in development there will be upgrades and buildings that are unreachable without prestige levels, for now it is just in for testing!</HelpText>
        <HelpText id="PrestigeCost">Here goes prestige cost</HelpText>
        <Button onClick={() => PrestigeLevelPress()} >Prestige now!</Button>
        <ErrorText id="PrestigeErrorText"/>
        <HelpHeaderText id="PrestigeLevelText">Prestige level: 0</HelpHeaderText>
        <HelpHeader2Text id="PrestigePointsText">Prestige points: 0</HelpHeader2Text>
        <ErrorText id="PrestigeLevelingErrorText"/>
        <StatsInfoText id="CycleLevelText">Cycle speed upgrades: 0</StatsInfoText>
        <DetailText>Each cycle speed upgrade halves the time of a cycle</DetailText>
        <Button onClick={() => PrestigeCycleSpeed()}>Upgrade Cycle Speed</Button>
        <StatsInfoText id="PrestigeBuilder">Barrack Builders: 0</StatsInfoText>
        <DetailText>Each barrack builder will construct 1 barrack every cycle (max 999999), but you can no longer buy barracks</DetailText>
        <Button onClick={() => PrestigeBuilder()}>Buy barrack builder</Button>
        </BuildPanelContainer>
      </TabContainer>
    </Container>
    </TopContainer>
  )
}
export default App;
