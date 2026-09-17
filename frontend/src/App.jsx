import { useEffect, useMemo, useState } from 'react';
import { Bar as RechartsBar, BarChart, CartesianGrid, Cell, LabelList, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const COLORS = ['#182a91', '#8c86cc', '#e7b267', '#5b9b9a', '#e68a6b'];
const series = [['LiberalArts', 'Liberal arts', '#8c86cc'], ['Finance', 'Finance', '#94a7e9'], ['Business', 'Business', '#7357a7'], ['HumanResources', 'Human resources', '#b869c0'], ['SocialScience', 'Social science', '#7189d5'], ['ComputerScience', 'Computer science', '#314db7']];
const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value);

function MetricCard({ label, value, previous, suffix = '', detail }) {
  const change = typeof value === 'number' && typeof previous === 'number' ? Math.round(((value - previous) / previous) * 100) : null;
  return <article className="metric-card"><p className="metric-label">{label}</p><div className="metric-value">{typeof value === 'number' ? formatNumber(value) : value}{suffix}</div><div className="metric-meta">{change !== null && <span className="trend-up">↗ {change}%</span>}<span>{detail || 'vs. last year'}</span></div></article>;
}

function FilterSelect({ label, value, options, onChange }) {
  return <label className="filter"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function PercentageLabel({ x, y, width, value, payload }) {
  const total = series.reduce((sum, [key]) => sum + (payload?.[key] || 0), 0);
  if (!value || !total) return null;
  return <text x={x + width / 2} y={y - 6} textAnchor="middle" fill="#536079" fontSize={9} fontWeight={600}>{`${((value / total) * 100).toFixed(1)}%`}</text>;
}

function Bar(props) {
  return <RechartsBar {...props}><LabelList dataKey={props.dataKey} content={<PercentageLabel />} /></RechartsBar>;
}

function DistributionChart({ title, data }) {
  return <article className="panel distribution-panel"><div className="panel-heading"><div><p className="eyebrow">Student mix</p><h2>{title}</h2></div><span className="more">•••</span></div><div className="distribution-body"><div className="donut-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="value" nameKey="label" innerRadius={54} outerRadius={78} paddingAngle={3} stroke="none">{data.map((entry, index) => <Cell key={entry.label} fill={COLORS[index % COLORS.length]} />)}</Pie><Tooltip formatter={(value) => `${value}%`} /></PieChart></ResponsiveContainer><div className="donut-center"><strong>{data.reduce((sum, item) => sum + item.value, 0)}%</strong><span>total</span></div></div><div className="legend-list">{data.map((item, index) => <div className="legend-row" key={item.label}><span className="legend-dot" style={{ backgroundColor: COLORS[index % COLORS.length] }} /><span>{item.label}</span><strong>{item.value}%</strong></div>)}</div></div></article>;
}

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [year, setYear] = useState('All years');
  const [major, setMajor] = useState('All majors');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetch(`${API_URL}/dashboard`).then((response) => { if (!response.ok) throw new Error('Dashboard data could not be loaded.'); return response.json(); }).then((result) => setDashboard(result.data)).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false)); }, []);

  const trendData = useMemo(() => { if (!dashboard) return []; return year === 'All years' ? dashboard.applicationTrends : dashboard.applicationTrends.filter((item) => String(item.year) === year); }, [dashboard, year]);
  if (loading) return <div className="status-screen">Loading analytics dashboard...</div>;
  if (error) return <div className="status-screen error-screen"><strong>Unable to load dashboard</strong><span>{error}</span><small>Confirm the backend is running and MongoDB contains the seeded document.</small></div>;

  const { kpis, demographics, filters, terminationReasons } = dashboard;
  const visibleSeries = major === 'All majors' ? series : series.filter(([key]) => key === major.replaceAll(' ', ''));
  return <div className="app-shell"><aside className="sidebar"><div className="brand"><span className="brand-mark">N</span><div><strong>NORTHSTAR</strong><small>Institutional intelligence</small></div></div><nav><a className="active" href="#overview"><span>▦</span> Overview</a><a href="#applications"><span>↗</span> Applications</a><a href="#enrollment"><span>◫</span> Enrollment</a><a href="#students"><span>◎</span> Student profile</a><a href="#retention"><span>↻</span> Retention</a></nav><div className="sidebar-footer"><span className="avatar">AD</span><div><strong>Admin dashboard</strong><small>Academic year 2026</small></div></div></aside><main className="main-content" id="overview"><header className="topbar"><div className="breadcrumb">Analytics <span>/</span> Overview</div><div className="top-actions"><span className="live-dot" /> Live data <button className="icon-button" aria-label="Notifications">♢</button><span className="avatar">AD</span></div></header><section className="page-intro"><div><p className="eyebrow">Institutional performance</p><h1>Student success overview</h1><p className="intro-copy">A clear view of applications, enrollment, and student momentum across the institution.</p></div><button className="export-button" onClick={() => window.print()}>↓ Export report</button></section><section className="filters" aria-label="Dashboard filters"><FilterSelect label="Comparison" value={filters.academicPeriod} options={[filters.academicPeriod, 'Current year only']} onChange={() => {}} /><FilterSelect label="Year" value={year} options={['All years', ...dashboard.years.map(String)]} onChange={setYear} /><FilterSelect label="Major" value={major} options={filters.majorNames} onChange={setMajor} /></section><section className="metrics-grid"><MetricCard label="Applications" value={kpis.applications.current} previous={kpis.applications.previous} /><MetricCard label="Admission rate" value={kpis.admissionRate.current} previous={kpis.admissionRate.previous} suffix="%" /><MetricCard label="Top major" value={kpis.topMajor.current} detail={`Previously ${kpis.topMajor.previous}`} /><MetricCard label="Total enrollment" value={kpis.totalEnrollment.current} previous={kpis.totalEnrollment.previous} /><MetricCard label="Annual retention" value={kpis.retentionRate.current} previous={kpis.retentionRate.previous} suffix="%" /></section><section className="panel trend-panel" id="applications"><div className="panel-heading"><div><p className="eyebrow">Applications</p><h2>Application trends by major</h2></div><span className="more">•••</span></div><div className="chart-legend">{visibleSeries.map(([, label, color]) => <span key={label}><i style={{ backgroundColor: color }} />{label}</span>)}</div><div className="chart-area"><ResponsiveContainer width="100%" height="100%"><BarChart data={trendData} margin={{ top: 16, right: 8, left: -18, bottom: 0 }} barGap={2}><CartesianGrid vertical={false} stroke="#e5e8f0" /><XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: '#8790a5', fontSize: 11 }} /><YAxis tickLine={false} axisLine={false} tick={{ fill: '#8790a5', fontSize: 11 }} /><Tooltip cursor={{ fill: '#f4f5fa' }} /><Legend content={() => null} />{visibleSeries.map(([key, , color]) => <Bar key={key} dataKey={key} fill={color} radius={[3, 3, 0, 0]} maxBarSize={18} />)}</BarChart></ResponsiveContainer></div></section><section className="lower-grid" id="students"><DistributionChart title="Ethnicity" data={demographics.ethnicity} /><DistributionChart title="Gender" data={demographics.gender} /><DistributionChart title="Student type" data={demographics.studentType} /><DistributionChart title="Domicile" data={demographics.domicile} /></section><section className="panel termination-panel" id="retention"><div className="panel-heading"><div><p className="eyebrow">Retention signals</p><h2>Termination reasons</h2></div></div><div className="termination-list">{terminationReasons.map((item, index) => <div className="termination-row" key={item.reason}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.reason}</strong><div className="reason-bar"><i style={{ width: `${(item.count / terminationReasons[0].count) * 100}%` }} /></div><b>{item.count}</b></div>)}</div></section><footer>Northstar Analytics <span>•</span> Data refreshed from MongoDB <span>•</span> 17 September 2026</footer></main></div>;
}

export default App;
