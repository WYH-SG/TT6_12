
const WalletContainer = ({currency, value}) => {
  return(
    <div className="walletContainer">
      <h2 style={{textAlign: "center"}}>{currency}</h2>
      <h1 style={{textAlign: "center"}}>${value}</h1>
    </div>
  )
}
WalletContainer.defaultProps={
  currency:"SGD",
  value: '0.00',
}
export default WalletContainer