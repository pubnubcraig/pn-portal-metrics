import { createContext, useContext, useRef, useState } from 'react'

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
        portalAccountId.current = val;
    
        // clear Apps list
        setPortalApps([]);
        setPortalKeys([]);
        fetchApps(val);
    };
    
    const fetchApps = () => {
        console.log("fetchApps");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        timerAlert("Fetching your apps", "Please wait, while we fetch your apps...", 5000);
    
        let uri = `/apps?ownerid=${portalAccountId.current}&token=${portalToken.current}`;
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
        portalAppId.current = val;
    
        // clear Apps list
        setPortalKeys([]);
        fetchKeys(val);
    };
    
    const fetchKeys = () => {
        console.log("fetchKeys");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        timerAlert("Fetching your keys", "Please wait, while we fetch your keys...", 5000);
    
        let uri = `/keys?appid=${portalAppId.current}&token=${portalToken.current}`;
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
        portalKeyId.current = val;
        fetchKeyUsage();
    };
    
    const fetchKeyUsage = (id) => {
        console.log("fetchKeyUsage");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        timerAlert("Fetching your keys", "Please wait, while we fetch your keys...", 5000);
    
        let uri = `/key-usage?keyid=${portalKeyId.current}&token=${portalToken.current}&start=${startDate.current}&end=${endDate.current}`;
        console.log(`uri: ${uri}`);
    
        fetch(uri, {signal: controller.signal}).then(res => res.json()).then((result) => {
            console.log("key usage results", result);
            usage.current = result;
            updateCosts();
            
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

    const sumMetrics = (metric) => {
        console.log("sumMetrics", metric);
        const keys = Object.keys(metric);
        console.log("keys", keys);

        let sum = 0;

        keys.forEach((key, index) => {
            console.log(`${key}: ${metric[key].sum}`);
            sum = sum + metric[key].sum;
        });

        return sum;
    }
    
    const updateCosts = () => {
        console.log("updateCosts:", groupMetricsBy.current, startDate.current, endDate.current, usage.current);
        if (portalKeys.length == 0 || usage === null) return;
    
        const totSum = sumMetrics(usage.current.transactions_total);
        const repSum = sumMetrics(usage.current.replicated);
        const edgSum = sumMetrics(usage.current.edge);
        const sigSum = sumMetrics(usage.current.signals);
        const funSum = sumMetrics(usage.current.executions);
        const maSum = sumMetrics(usage.current.message_actions);
    
        const repCost = repSum * rateRep;
        const edgCost = edgSum * rateEdg;
        const funCost = funSum * rateFun;
        const sigCost = sigSum * rateSig;
        const maCost  = maSum *  rateMa;
        const totCost = repCost + edgCost + funCost + sigCost + maCost;
    
        setTxRep(repSum.toLocaleString());
        setCostRep(repCost.toLocaleString(
            undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
    
        setTxEdg(edgSum.toLocaleString());
        setCostEdg(edgCost.toLocaleString(
            undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));  
        
        setTxSig(sigSum.toLocaleString());
        setCostSig(sigCost.toLocaleString(
            undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));  
    
        setTxFun(funSum.toLocaleString());
        setCostFun(funCost.toLocaleString(
          undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));

        setTxMa(maSum.toLocaleString());
        setCostMa(maCost.toLocaleString(
            undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
  
        setTxTot(totSum.toLocaleString());
        setCostTot(totCost.toLocaleString(
            undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));    
    }

    const portalUsername = useRef();
    const portalToken = useRef();
    const portalUserId = useRef();
    const portalAccountId = useRef();
    const portalAppId = useRef();
    const portalKeyId = useRef();
    const usage = useRef();

    const [portalAccounts, setPortalAccounts] = useState([]);
    const [portalApps, setPortalApps] = useState([]);
    const [portalKeys, setPortalKeys] = useState([]);
    const [keySetName, setKeySetName] = useState();
    const [subKey, setSubKey] = useState("");

    const [rateRep, setRateRep] = useState(0.000075);
    const [rateEdg, setRateEdg] = useState(0.000020);
    const [rateFun, setRateFun] = useState(0.000025);
    const [rateSig, setRateSig] = useState(0.000005);
    const [rateMa, setRateMa] = useState(0.000015);

    // tx (transaction type) or ft (feature)
    const groupMetricsBy = useRef("tx");
    const startDate = useRef();
    const endDate = useRef();

    const [costTot, setCostTot] = useState(0.00);
    const [costRep, setCostRep] = useState(0.00);
    const [costEdg, setCostEdg] = useState(0.00);
    const [costFun, setCostFun] = useState(0.00);
    const [costSig, setCostSig] = useState(0.00);
    const [costMa, setCostMa] = useState(0.00);

    const [txApiData, setTxApiData] = useState([]);

    const [txTot, setTxTot] = useState(0);
    const [txRep, setTxRep] = useState(0);
    const [txEdg, setTxEdg] = useState(0);
    const [txFun, setTxFun] = useState(0);
    const [txSig, setTxSig] = useState(0);
    const [txMa, setTxMa] = useState(0);

    const pnAccountData = {
        handleSelectAccount, handleSelectApp, handleSelectKey,
        fetchKeyUsage, updateCosts,
        portalUsername,
        portalToken,
        portalUserId,
        portalAccountId,
        portalAccounts, setPortalAccounts,
        portalApps, setPortalApps,
        portalAppId,
        portalKeys, setPortalKeys,
        portalKeyId,
        keySetName, setKeySetName,
        subKey, setSubKey,

        rateRep, setRateRep,
        rateEdg, setRateEdg,
        rateFun, setRateFun,
        rateSig, setRateSig,
        rateMa, setRateMa,

        groupMetricsBy,
        startDate,
        endDate,

        usage,
        costTot, setCostTot,
        costRep, setCostRep,
        costEdg, setCostEdg,
        costFun, setCostFun,
        costSig, setCostSig,
        costMa, setCostMa,

        txApiData, setTxApiData,

        txTot, setTxTot,
        txRep, setTxRep,
        txEdg, setTxEdg,
        txFun, setTxFun,
        txSig, setTxSig,
        txMa, setTxMa,
    }

    return <Context.Provider value={pnAccountData}> {children} </Context.Provider>
}

export const usePnAccountData = () => {
    return useContext(Context)
}