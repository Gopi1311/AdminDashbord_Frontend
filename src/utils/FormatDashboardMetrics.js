export function formatDashboardMetrics(data) {
  // Helpers
  const toNumber = (value) => parseFloat(value) || 0;

  const formatCurrency = (value) =>
    toNumber(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

  const formatNumber = (value) => toNumber(value).toLocaleString("en-US");

  const formatPercent = (value) => `${toNumber(value).toFixed(2)}%`;

  const getChange = (current, last) => {
    const cur = toNumber(current);
    const prev = toNumber(last);

    if (prev === 0) return cur === 0 ? "0%" : "↑ 100%";

    const change = ((cur - prev) / prev) * 100;
    return `${change >= 0 ? "↑" : "↓"} ${Math.abs(change).toFixed(1)}%`;
  };

  // Conversion Rate
  const currentConversion = data.total_customers
    ? (toNumber(data.current_orders) / toNumber(data.total_customers)) * 100
    : 0;
  const lastConversion = data.old_customers
    ? (toNumber(data.last_orders) / toNumber(data.old_customers)) * 100
    : 0;

  const conversionChange =
    lastConversion === 0
      ? currentConversion === 0
        ? "0%"
        : "↑ 100%"
      : getChange(currentConversion, lastConversion);

  const conversionType =
    currentConversion >= lastConversion ? "positive" : "negative";

  return [
    {
      label: "Total Revenue",
      value: formatCurrency(data.current_month_revenue),
      change: getChange(data.current_month_revenue, data.last_month_revenue),
      icon: "💰",
      changeType:
        toNumber(data.current_month_revenue) >=
        toNumber(data.last_month_revenue)
          ? "positive"
          : "negative",
    },
    {
      label: "Orders",
      value: formatNumber(data.current_orders),
      change: getChange(data.current_orders, data.last_orders),
      icon: "📦",
      changeType:
        toNumber(data.current_orders) >= toNumber(data.last_orders)
          ? "positive"
          : "negative",
    },
    {
      label: "Customers",
      value: formatNumber(data.total_customers),
      change: getChange(data.new_customers, data.old_customers),
      icon: "👥",
      changeType:
        toNumber(data.new_customers) >= toNumber(data.old_customers)
          ? "positive"
          : "negative",
    },
    {
      label: "Conversion Rate",
      value: formatPercent(currentConversion),
      change: conversionChange,
      icon: "📊",
      changeType: conversionType,
    },
  ];
}
