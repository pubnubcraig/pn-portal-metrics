import { createContext, useContext, useState } from 'react'

const Context = createContext();

const timerAlert = () => {
    return;
}

const hideAlert = () => {
    return;
}

export const PnAccountProvider = ({ children }) => {
    const handleSelectAccount = (val) => {
        console.log("handleSelectAccount: ", val);
        setPortalAccountId(val);
    
        // clear Apps list
        setPortalApps([]);
        setPortalKeys([]);
        fetchApps(val);
    };
    
    const fetchApps = (id) => {
        console.log("fetchApps");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        timerAlert("Fetching your apps", "Please wait, while we fetch your apps...", 5000);
    
        let uri = `/apps?ownerid=${id}&token=${portalToken}`;
        console.log(`uri: ${uri}`);
    
        fetch(uri, {signal: controller.signal}).then(res => res.json()).then((result) => {
            console.log("result", result);
            setPortalApps(result.result);
    
            clearTimeout(timeoutId);
            hideAlert();
            },
            (error) => {
                hideAlert();
                console.log("Fetch apps error:", error);
                timerAlert("Fetch apps error", error + " (VPN enabled?)", 5000);
            }
            ).catch = (error) => {
                hideAlert();
                console.log("Fetch apps error:", error);
                timerAlert("fetch /apps", error, 5000);
            };
    }
    
    const handleSelectApp = (val) => {
        console.log("handleSelectApp: ", val);
        setPortalAppId(val);
    
        // clear Apps list
        setPortalKeys([]);
        fetchKeys(val);
    };
    
    const fetchKeys = (id) => {
        console.log("fetchKeys");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        timerAlert("Fetching your keys", "Please wait, while we fetch your keys...", 5000);
    
        let uri = `/keys?appid=${id}&token=${portalToken}`;
        console.log(`uri: ${uri}`);
    
        fetch(uri, {signal: controller.signal}).then(res => res.json()).then((result) => {
            console.log("result", result);
            setPortalKeys(result);
    
            clearTimeout(timeoutId);
            hideAlert();
            },
            (error) => {
                hideAlert();
                console.log("Fetch keys error:", error);
                timerAlert("Fetch keys error", error + " (VPN enabled?)", 5000);
            }
            ).catch = (error) => {
                hideAlert();
                console.log("Fetch keys error:", error);
                timerAlert("fetch /keys", error, 5000);
            };
    }
    
    const handleSelectKey = (val) => {
        console.log("handleSelectKey: ", val);
        setPortalKeyId(val);
        fetchKeyUsage(val);
    };
    
    const fetchKeyUsage = (id) => {
        console.log("fetchKeyUsage");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        timerAlert("Fetching your keys", "Please wait, while we fetch your keys...", 5000);
    
        let uri = `/key-usage?keyid=${id}&token=${portalToken}`;
        console.log(`uri: ${uri}`);
    
        fetch(uri, {signal: controller.signal}).then(res => res.json()).then((result) => {
            console.log("key usage results", result);
            setUsage(result);
            
            clearTimeout(timeoutId);
            hideAlert();
            },
            (error) => {
                hideAlert();
                console.log("Fetch keys error:", error);
                timerAlert("Fetch keys error", error + " (VPN enabled?)", 5000);
            }
            ).catch = (error) => {
                hideAlert();
                console.log("Fetch keys error:", error);
                timerAlert("fetch /keys", error, 5000);
            };
    }
    
    const updateCosts = () => {
        if (portalKeys.length == 0) return;
    
        const totSum = usage.transactions_total[Object.keys(usage.transactions_total)[0]].sum;
        const repSum = usage.replicated[Object.keys(usage.replicated)[0]].sum;
        const edgSum = usage.edge[Object.keys(usage.edge)[0]].sum;
        // const funSum = usage.edge[Object.keys(usage.functions)[0]].sum;
        const sigSum = usage.signals[Object.keys(usage.signals)[0]].sum;
    
        const repCost = repSum * rateRep;
        const edgCost = edgSum * rateEdg;
        // const funCost = funSum * rateFun;
        const sigCost = sigSum * rateSig;
        const totCost = repCost + edgCost + sigCost;
        // const totCost = repCost + edgCost + funCost + sigCost + totCost;
    
        setCostRep(repCost.toLocaleString(
            undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
    
        setTxRep(repSum.toLocaleString());
    
        setCostEdg(edgCost.toLocaleString(
        undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));  
    
        setTxEdg(edgSum.toLocaleString());
    
        // setCostFun(funCost.toLocaleString(
        //   undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
    
        // setTxFun(funSum.toLocaleString());
    
        setCostSig(sigCost.toLocaleString(
            undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));  
    
        setTxSig(sigSum.toLocaleString());
    
        setCostTot(totCost.toLocaleString(
        undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
    
        setTxTot(totSum.toLocaleString());
    }

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

    const [txTot, setTxTot] = useState(0);
    const [txRep, setTxRep] = useState(0);
    const [txEdg, setTxEdg] = useState(0);
    const [txFun, setTxFun] = useState(0);
    const [txSig, setTxSig] = useState(0);

    const pnAccountData = {
        handleSelectAccount, handleSelectApp, handleSelectKey,
        fetchKeyUsage, updateCosts,
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

        txTot, setTxTot,
        txRep, setTxRep,
        txEdg, setTxEdg,
        txFun, setTxFun,
        txSig, setTxSig,
    }

    return <Context.Provider value={pnAccountData}> {children} </Context.Provider>
}

export const usePnAccountData = () => {
    return useContext(Context)
}