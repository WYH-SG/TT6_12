
const WalletContainer = ({currency, value}) => {
  return(
    <div className="walletContainer">
      <h1 style={{textAlign: "center"}}>{currency}</h1>
      <h3 style={{textAlign: "center"}}>${value}</h3>
    </div>
  )
}
WalletContainer.defaultProps={
  currency:"SGD",
  value: '0.00',
}
export default WalletContainer