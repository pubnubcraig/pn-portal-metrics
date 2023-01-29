import { createContext, useContext, useState } from 'react'

const Context = createContext()

export const PnAccountProvider = ({ children }) => {
    const [portalUsername, setPortalUsername] = useState();
    const [portalToken, setPortalToken] = useState();
    const [portalUserId, setPortalUserId] = useState();
    const [portalAccountId, setPortalAccountId] = useState();
    const [portalAccounts, setPortalAccounts] = useState([]);
    const [portalApps, setPortalApps] = useState([]);
    const [portalAppId, setPortalAppId] = useState([]);
    const [portalKeys, setPortalKeys] = useState([]);
    const [portalKeyId, setPortalKeyId] = useState([]);
    const [keySetName, setKeySetName] = useState();
    const [subKey, setSubKey] = useState("");

    const [rateRep, setRateRep] = useState(0.000075);
    const [rateEdg, setRateEdg] = useState(0.000020);
    const [rateFun, setRateFun] = useState(0.000025);
    const [rateSig, setRateSig] = useState(0.000005);

    const [usage, setUsage] = useState(0);
    const [costTot, setCostTot] = useState(0.00);
    const [costRep, setCostRep] = useState(0.00);
    const [costEdg, setCostEdg] = useState(0.00);
    const [costFun, setCostFun] = useState(0.00);
    const [costSig, setCostSig] = useState(0.00);

    const pnAccountData = {
        portalUsername, setPortalUsername,
        portalToken, setPortalToken,
        portalUserId, setPortalUserId,
        portalAccountId, setPortalAccountId,
        portalAccounts, setPortalAccounts,
        portalApps, setPortalApps,
        portalAppId, setPortalAppId,
        portalKeys, setPortalKeys,
        portalKeyId, setPortalKeyId,
        keySetName, setKeySetName,
        subKey, setSubKey,

        rateRep, setRateRep,
        rateEdg, setRateEdg,
        rateFun, setRateFun,
        rateSig, setRateSig,

        usage, setUsage,
        costTot, setCostTot,
        costRep, setCostRep,
        costEdg, setCostEdg,
        costFun, setCostFun,
        costSig, setCostSig,
    }

    return <Context.Provider value={pnAccountData}> {children} </Context.Provider>
}

export const usePnAccountData = () => {
    return useContext(Context)
}