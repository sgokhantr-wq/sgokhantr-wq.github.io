import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell, Area,
    ComposedChart, Line, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import type { Accent } from '../types';
import { ACCENTS } from './ui/accents';
import { CHART, tooltipStyle } from './ui/chartTheme';
import { fadeUp } from './ui/variants';

/* ────────────────────────── Small UI helpers ────────────────────────── */

const SLIDER_ACCENT: Record<Accent, string> = {
    emerald: 'accent-emerald-400',
    sky: 'accent-sky-400',
    amber: 'accent-amber-400',
    zinc: 'accent-zinc-500',
};

const Slider: React.FC<{
    label: string; display: string; value: number; min: number; max: number; step: number;
    onChange: (v: number) => void; accent: Accent; hint?: string; compact?: boolean;
}> = ({ label, display, value, min, max, step, onChange, accent, hint, compact }) => (
    <label className="block">
        <div className="mb-2 flex justify-between">
            <span className={`font-medium text-zinc-300 ${compact ? 'text-sm' : ''}`}>{label}</span>
            <span className={`font-mono ${compact ? 'text-sm' : ''} ${ACCENTS[accent].text}`}>{display}</span>
        </div>
        <input type="range" min={min} max={max} step={step} value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className={`w-full ${SLIDER_ACCENT[accent]}`} />
        {hint && <p className="mt-1 text-xs text-zinc-600">{hint}</p>}
    </label>
);

const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
    <div className={`panel p-6 ${className}`}>{children}</div>
);

const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="border-b border-white/[0.06] pb-4 font-display text-lg font-semibold text-white">{children}</h3>
);

const DemoHeader: React.FC<{ index: string; title: string; children: React.ReactNode }> = ({ index, title, children }) => (
    <div className="mb-12 max-w-3xl">
        <span className="eyebrow">{index}</span>
        <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">{title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">{children}</p>
    </div>
);

const axisTick = { fill: CHART.tick, fontSize: 12 };

/* ────────────────────────── Page ────────────────────────── */

const ProductionPlanningDemo: React.FC = () => {
    const [demand, setDemand] = useState<number>(1000);
    const [capacity, setCapacity] = useState<number>(1200);
    const [inventory, setInventory] = useState<number>(200);

    // Calculations
    const totalRequired = Math.max(0, demand - inventory);
    const plannedProduction = Math.min(totalRequired, capacity);
    const finalInventory = inventory + plannedProduction - demand;
    const capacityUtilization = (plannedProduction / capacity) * 100;
    const isShortfall = finalInventory < 0;

    const data = [
        { name: 'Initial Inventory', units: inventory, fill: CHART.inventory },
        { name: 'Planned Production', units: plannedProduction, fill: CHART.capacity },
        { name: 'Total Demand', units: demand, fill: CHART.demand },
    ];

    // --- Material Inventory Simulation ---
    const [dailyDemand, setDailyDemand] = useState<number>(100);
    const [dailyProduction, setDailyProduction] = useState<number>(120);
    const [minInventory, setMinInventory] = useState<number>(200);
    const [maxInventory, setMaxInventory] = useState<number>(800);
    const [startingStock] = useState<number>(500);

    const timeSeriesData = useMemo(() => {
        let currentStock = startingStock;
        const series = [];
        for (let day = 1; day <= 14; day++) {
            // Add realistic variability based on the day (pseudo-random but stable pattern)
            const demandVariation = Math.round(dailyDemand * 0.25 * Math.sin(day * 2) + (day % 3 === 0 ? dailyDemand * 0.15 : -dailyDemand * 0.05));
            const prodVariation = Math.round(dailyProduction * 0.15 * Math.cos(day * 1.5) - (day % 5 === 0 ? dailyProduction * 0.2 : 0));

            const actualDemand = Math.max(0, dailyDemand + demandVariation);
            const actualProduction = Math.max(0, dailyProduction + prodVariation);

            currentStock += actualProduction;
            currentStock -= actualDemand;

            let status = 'Optimal';
            if (currentStock < minInventory) status = 'Warning: Stockout Risk';
            if (currentStock > maxInventory) status = 'Warning: Excess Inventory';

            series.push({
                day: `Day ${day}`,
                inventory: currentStock,
                min: minInventory,
                max: maxInventory,
                demand: actualDemand,
                production: actualProduction,
                status,
            });
        }
        return series;
    }, [startingStock, dailyDemand, dailyProduction, minInventory, maxInventory]);

    // --- DEMO 3: Multi-Level BOM Demand Netting ---
    const [bomDemand, setBomDemand] = useState<number>(100);
    const [safetyStockPct, setSafetyStockPct] = useState<number>(10);
    const [onHandSA001, setOnHandSA001] = useState<number>(20);
    const [onHandSA002, setOnHandSA002] = useState<number>(10);
    const [onHandCX001, setOnHandCX001] = useState<number>(50);
    const [onHandCZ001, setOnHandCZ001] = useState<number>(30);
    const [onHandRM001, setOnHandRM001] = useState<number>(200);
    const [onHandRM002, setOnHandRM002] = useState<number>(100);

    const bomCalculations = useMemo(() => {
        const grFG = bomDemand;
        const grSA001 = grFG * 2;
        const grSA002 = grFG * 1;
        const grCX001 = grSA001 * 3;
        const grCZ001 = grSA002 * 4;
        const grRM001 = grCX001 * 5;
        const grRM002 = grCZ001 * 2;

        const ssFactor = safetyStockPct / 100;

        const items = [
            { level: 0, indent: 0, item: 'FG-001', qtyPer: '-', gr: grFG, oh: 0 },
            { level: 1, indent: 1, item: 'SA-001', qtyPer: '2', gr: grSA001, oh: onHandSA001 },
            { level: 2, indent: 2, item: 'CX-001', qtyPer: '3', gr: grCX001, oh: onHandCX001 },
            { level: 3, indent: 3, item: 'RM-001', qtyPer: '5', gr: grRM001, oh: onHandRM001 },
            { level: 1, indent: 1, item: 'SA-002', qtyPer: '1', gr: grSA002, oh: onHandSA002 },
            { level: 2, indent: 2, item: 'CZ-001', qtyPer: '4', gr: grCZ001, oh: onHandCZ001 },
            { level: 3, indent: 3, item: 'RM-002', qtyPer: '2', gr: grRM002, oh: onHandRM002 },
        ];

        return items.map((i) => {
            const ss = Math.round(i.gr * ssFactor);
            const netReq = Math.max(0, i.gr - i.oh + ss);
            return { ...i, ss, netReq, name: i.item };
        });
    }, [bomDemand, safetyStockPct, onHandSA001, onHandSA002, onHandCX001, onHandCZ001, onHandRM001, onHandRM002]);

    const totalNetReq = bomCalculations.reduce((sum, item) => sum + item.netReq, 0);
    const maxNetReq = Math.max(...bomCalculations.map((i) => i.netReq));
    let bomStatus = 'All Covered';
    if (maxNetReq >= 500) {
        bomStatus = 'Critical Shortage';
    } else if (totalNetReq > 0) {
        bomStatus = 'Partial Shortage';
    }
    const bomBadge = bomStatus === 'All Covered'
        ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400'
        : bomStatus === 'Partial Shortage'
            ? 'border-amber-400/30 bg-amber-400/10 text-amber-400'
            : 'border-red-400/30 bg-red-400/10 text-red-400';

    // ── Demo 4: Digital Twin state ──────────────────────────────────────────
    const [capacityUsed, setCapacityUsed] = useState<number>(75);
    const [defectRate, setDefectRate] = useState<number>(5);
    const [onTimeDelivery, setOnTimeDelivery] = useState<number>(88);
    const [laborEfficiency, setLaborEfficiency] = useState<number>(80);
    const [materialCostRatio, setMaterialCostRatio] = useState<number>(45);
    const [supplierOTD, setSupplierOTD] = useState<number>(82);
    const [headcount, setHeadcount] = useState<number>(85);

    const digitalTwinMetrics = useMemo(() => {
        const oee = Math.round(capacityUsed * (laborEfficiency / 100) * ((100 - defectRate) / 100));
        const throughput = Math.round(capacityUsed * ((100 - defectRate) / 100));
        const costEfficiency = 100 - materialCostRatio;
        const customerScore = onTimeDelivery;
        const supplierScore = supplierOTD;
        // workforce score: how well current headcount covers required staffing for active capacity
        const requiredWorkers = Math.max(1, Math.round(capacityUsed * 1.5));
        const workforceScore = Math.min(100, Math.round((headcount / requiredWorkers) * 100));
        const overallHealth = Math.round((oee + throughput + costEfficiency + customerScore + supplierScore + workforceScore) / 6);
        const radarData = [
            { metric: 'OEE', value: oee },
            { metric: 'Throughput', value: throughput },
            { metric: 'Cost Efficiency', value: costEfficiency },
            { metric: 'Customer OTD', value: customerScore },
            { metric: 'Labor Efficiency', value: laborEfficiency },
            { metric: 'Supplier OTD', value: supplierScore },
            { metric: 'Workforce', value: workforceScore },
        ];
        return { oee, throughput, costEfficiency, customerScore, supplierScore, workforceScore, overallHealth, radarData };
    }, [capacityUsed, defectRate, onTimeDelivery, laborEfficiency, materialCostRatio, supplierOTD, headcount]);

    const twinHealthColor = digitalTwinMetrics.overallHealth >= 80 ? 'text-emerald-400' : digitalTwinMetrics.overallHealth >= 60 ? 'text-amber-400' : 'text-red-400';
    const twinStatusLabel = digitalTwinMetrics.overallHealth >= 80 ? 'Healthy' : digitalTwinMetrics.overallHealth >= 60 ? 'Needs Attention' : 'Critical';
    const twinStatusBg = digitalTwinMetrics.overallHealth >= 80
        ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400'
        : digitalTwinMetrics.overallHealth >= 60
            ? 'border-amber-400/30 bg-amber-400/10 text-amber-400'
            : 'border-red-400/30 bg-red-400/10 text-red-400';

    return (
        <div className="relative">
            <div className="grid-bg pointer-events-none absolute inset-0 h-[600px]" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-sky-500/[0.04] blur-3xl" />

            <div className="container relative z-10 mx-auto max-w-7xl px-4 py-16">
                <motion.div {...fadeUp(0)} className="mb-14 max-w-3xl">
                    <span className="eyebrow">Live Demo · Planning Engine Simulator</span>
                    <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                        Production Planning 101
                    </h1>
                    <p className="mt-5 text-lg leading-relaxed text-zinc-400">
                        Production planning aligns <span className="font-semibold text-amber-400">demand</span> with available{' '}
                        <span className="font-semibold text-sky-400">capacity</span> and{' '}
                        <span className="font-semibold text-zinc-200">inventory</span>. Drive the controls and watch the
                        plan respond. The same arithmetic runs inside the capacity engine on the platform page, at a far larger scale.
                    </p>
                </motion.div>

                {/* ── DEMO 1: Weekly balance ── */}
                <section>
                    <DemoHeader index="01 · Weekly Balance" title="Supply vs. demand in one week">
                        The simplest plan: net demand against stock, then cap it at capacity.
                    </DemoHeader>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <Card className="space-y-8 lg:col-span-1">
                            <CardTitle>Inputs</CardTitle>
                            <Slider label="Weekly Demand" display={`${demand} units`} value={demand} min={0} max={2000} step={50}
                                onChange={setDemand} accent="amber" hint="Expected customer orders." />
                            <Slider label="Production Capacity" display={`${capacity} units`} value={capacity} min={0} max={2000} step={50}
                                onChange={setCapacity} accent="sky" hint="Maximum units that can be built per week." />
                            <Slider label="Current Inventory" display={`${inventory} units`} value={inventory} min={0} max={1000} step={50}
                                onChange={setInventory} accent="zinc" hint="Stock already available in the warehouse." />
                        </Card>

                        <div className="space-y-6 lg:col-span-2">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="panel p-4 text-center">
                                    <p className="mb-1 text-sm text-zinc-500">Planned Production</p>
                                    <p className="font-mono text-3xl font-bold text-sky-400">{plannedProduction}</p>
                                </div>
                                <div className="panel p-4 text-center">
                                    <p className="mb-1 text-sm text-zinc-500">Capacity Utilization</p>
                                    <p className="font-mono text-3xl font-bold text-sky-400">{capacityUtilization.toFixed(1)}%</p>
                                </div>
                                <div className={`panel p-4 text-center ${isShortfall ? 'border-red-400/30 bg-red-400/5' : ''}`}>
                                    <p className={`mb-1 text-sm ${isShortfall ? 'text-red-400' : 'text-zinc-500'}`}>End of Week Status</p>
                                    <p className={`font-mono text-2xl font-bold ${isShortfall ? 'text-red-400' : 'text-emerald-400'}`}>
                                        {isShortfall ? `Shortfall: ${Math.abs(finalInventory)}` : `Surplus: ${finalInventory}`}
                                    </p>
                                </div>
                            </div>

                            <Card className="flex h-80 flex-col">
                                <h3 className="mb-4 font-display text-base font-semibold text-white">Supply vs. Demand Overview</h3>
                                <div className="flex-grow">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} horizontal={false} />
                                            <XAxis type="number" stroke={CHART.axis} tick={axisTick} />
                                            <YAxis dataKey="name" type="category" stroke={CHART.axis} width={120} tick={axisTick} />
                                            <RechartsTooltip contentStyle={tooltipStyle} itemStyle={{ color: CHART.tooltipText }} cursor={{ fill: '#ffffff08' }} />
                                            <Bar dataKey="units" radius={[0, 4, 4, 0]}>
                                                {data.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            <Card>
                                <h3 className="mb-3 font-display text-lg font-semibold text-white">How it works</h3>
                                <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
                                    <p>
                                        Take <strong className="text-zinc-200">demand</strong> ({demand} units) and subtract what is already in{' '}
                                        <strong className="text-zinc-200">inventory</strong> ({inventory} units) to find the total required ({totalRequired} units).
                                    </p>
                                    <p>
                                        Then compare that requirement to <strong className="text-zinc-200">capacity</strong> ({capacity} units).{' '}
                                        {plannedProduction === capacity && capacity < totalRequired
                                            ? <span className="text-red-400">Capacity is lower than the requirement, so production maxes out at {plannedProduction} units and the week ends short.</span>
                                            : <span className="text-sky-400">Capacity is sufficient, so you only build what you need: {plannedProduction} units.</span>}
                                    </p>
                                    <p>
                                        The goal is to balance the three so you neither run out of product nor tie up cash in excess stock.
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* ── DEMO 2: Inventory projection ── */}
                <section className="mt-16 border-t border-white/[0.06] pt-16">
                    <DemoHeader index="02 · Material Inventory Projection" title="Fourteen days of one part number">
                        Keep stock between the <span className="font-semibold text-amber-400">minimum (safety stock)</span> and the{' '}
                        <span className="font-semibold text-emerald-400">maximum (storage limit)</span> while daily demand and output wobble.
                    </DemoHeader>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        <div className="space-y-6 lg:col-span-1">
                            <Card className="space-y-6">
                                <CardTitle>Daily Rates</CardTitle>
                                <Slider label="Avg Daily Demand" display={`${dailyDemand}`} value={dailyDemand} min={50} max={300} step={10}
                                    onChange={setDailyDemand} accent="amber" hint="Baseline consumed per day (± variability applied)" />
                                <Slider label="Avg Daily Production" display={`${dailyProduction}`} value={dailyProduction} min={50} max={300} step={10}
                                    onChange={setDailyProduction} accent="sky" hint="Baseline built per day (± variability applied)" />
                            </Card>
                            <Card className="space-y-6">
                                <CardTitle>Policy Limits</CardTitle>
                                <Slider label="Min Inventory" display={`${minInventory}`} value={minInventory} min={50} max={500} step={50}
                                    onChange={setMinInventory} accent="amber" hint="Safety stock threshold" />
                                <Slider label="Max Inventory" display={`${maxInventory}`} value={maxInventory} min={300} max={1500} step={50}
                                    onChange={setMaxInventory} accent="emerald" hint="Max storage capacity" />
                            </Card>
                        </div>

                        <Card className="flex h-[500px] flex-col lg:col-span-3">
                            <div className="mb-4">
                                <h3 className="font-display text-base font-semibold text-white">14-Day Forward Projection</h3>
                                <p className="text-sm text-zinc-500">Starting stock: {startingStock} units</p>
                            </div>
                            <div className="flex-grow">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} />
                                        <XAxis dataKey="day" stroke={CHART.axis} tick={axisTick} />
                                        <YAxis stroke={CHART.axis} tick={axisTick} />
                                        <RechartsTooltip contentStyle={tooltipStyle} labelStyle={{ color: CHART.tooltipLabel }} />
                                        <Legend wrapperStyle={{ paddingTop: '20px', fontSize: 12 }} />
                                        <Area type="step" dataKey="max" fill="none" stroke={CHART.emerald} strokeDasharray="5 5" fillOpacity={0} name="Max Limit" />
                                        <Area type="step" dataKey="min" fill="none" stroke={CHART.amber} strokeDasharray="5 5" fillOpacity={0} name="Min Limit (Safety Stock)" />
                                        <Bar dataKey="demand" barSize={20} fill={CHART.sky} opacity={0.3} name="Daily Demand" radius={[2, 2, 0, 0]} />
                                        <Line type="monotone" dataKey="inventory" stroke={CHART.sky} strokeWidth={3}
                                            dot={{ r: 4, fill: CHART.tooltipBg, stroke: CHART.sky, strokeWidth: 2 }}
                                            activeDot={{ r: 6, fill: CHART.sky }} name="Projected Inventory" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* ── DEMO 3: BOM netting ── */}
                <section className="mt-16 border-t border-white/[0.06] pt-16">
                    <DemoHeader index="03 · Multi-Level BOM Demand Netting" title="Explode, net, and find the shortage">
                        MRP-style netting across BOM levels: explode <span className="font-semibold text-amber-400">gross requirements</span> down
                        to components and compute <span className="font-semibold text-sky-400">net requirements</span> against on-hand stock.
                    </DemoHeader>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        <div className="space-y-6 lg:col-span-1">
                            <Card className="space-y-6">
                                <CardTitle>Demand & Buffer</CardTitle>
                                <Slider compact label="FG-001 Demand" display={`${bomDemand}`} value={bomDemand} min={0} max={500} step={10}
                                    onChange={setBomDemand} accent="amber" />
                                <Slider compact label="Safety Stock %" display={`${safetyStockPct}%`} value={safetyStockPct} min={0} max={50} step={5}
                                    onChange={setSafetyStockPct} accent="sky" />
                            </Card>
                            <Card className="space-y-5">
                                <CardTitle>On-Hand Inventory</CardTitle>
                                {[
                                    { label: 'SA-001', val: onHandSA001, set: setOnHandSA001 },
                                    { label: 'SA-002', val: onHandSA002, set: setOnHandSA002 },
                                    { label: 'CX-001', val: onHandCX001, set: setOnHandCX001 },
                                    { label: 'CZ-001', val: onHandCZ001, set: setOnHandCZ001 },
                                    { label: 'RM-001', val: onHandRM001, set: setOnHandRM001 },
                                    { label: 'RM-002', val: onHandRM002, set: setOnHandRM002 },
                                ].map((ctrl) => (
                                    <Slider key={ctrl.label} compact label={ctrl.label} display={`${ctrl.val}`} value={ctrl.val}
                                        min={0} max={500} step={10} onChange={ctrl.set} accent="zinc" />
                                ))}
                            </Card>
                        </div>

                        <div className="space-y-6 lg:col-span-3">
                            <Card>
                                <h3 className="mb-4 font-display text-base font-semibold text-white">BOM Explosion & Netting</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full whitespace-nowrap border-collapse text-left">
                                        <thead>
                                            <tr className="bg-white/[0.03] text-sm text-zinc-300">
                                                <th className="border-b border-white/[0.06] p-3">Level</th>
                                                <th className="border-b border-white/[0.06] p-3">Item</th>
                                                <th className="border-b border-white/[0.06] p-3 text-center">Qty / Parent</th>
                                                <th className="border-b border-white/[0.06] p-3 text-right">Gross Req</th>
                                                <th className="border-b border-white/[0.06] p-3 text-right">On-Hand</th>
                                                <th className="border-b border-white/[0.06] p-3 text-right">Safety Stock</th>
                                                <th className="border-b border-white/[0.06] p-3 text-right">Net Req</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bomCalculations.map((row, idx) => (
                                                <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'} transition-colors hover:bg-white/[0.04]`}>
                                                    <td className="border-b border-white/[0.06] p-3 text-zinc-500">{row.level}</td>
                                                    <td className="border-b border-white/[0.06] p-3 text-zinc-200">
                                                        <span style={{ marginLeft: `${row.indent * 1.5}rem` }}>
                                                            {row.indent > 0 && <span className="mr-2 text-zinc-600">└─</span>}
                                                            {row.item}
                                                        </span>
                                                    </td>
                                                    <td className="border-b border-white/[0.06] p-3 text-center font-mono text-zinc-500">{row.qtyPer}</td>
                                                    <td className="border-b border-white/[0.06] p-3 text-right font-mono text-zinc-300">{row.gr}</td>
                                                    <td className="border-b border-white/[0.06] p-3 text-right font-mono text-zinc-500">{row.oh}</td>
                                                    <td className="border-b border-white/[0.06] p-3 text-right font-mono text-zinc-500">{row.ss}</td>
                                                    <td className={`border-b border-white/[0.06] p-3 text-right font-mono font-bold ${
                                                        row.netReq === 0 ? 'text-emerald-400' : row.netReq < 50 ? 'text-amber-400' : 'text-red-400'
                                                    }`}>
                                                        {row.netReq}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                                    <span className="text-sm text-zinc-500">Overall Status</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-zinc-400">Total Net Requirements: <span className="font-mono text-base text-zinc-200">{totalNetReq}</span></span>
                                        <span className={`rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider ${bomBadge}`}>
                                            {bomStatus}
                                        </span>
                                    </div>
                                </div>
                            </Card>

                            <Card className="flex h-80 flex-col">
                                <h3 className="mb-4 font-display text-base font-semibold text-white">Requirements Chart</h3>
                                <div className="flex-grow">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={bomCalculations} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />
                                            <XAxis dataKey="name" stroke={CHART.axis} tick={axisTick} />
                                            <YAxis stroke={CHART.axis} tick={axisTick} />
                                            <RechartsTooltip contentStyle={tooltipStyle} itemStyle={{ color: CHART.tooltipText }} cursor={{ fill: '#ffffff08' }} />
                                            <Legend wrapperStyle={{ fontSize: 12 }} />
                                            <Bar dataKey="gr" name="Gross Req" fill={CHART.zinc} radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="netReq" name="Net Req" fill={CHART.sky} radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* ── DEMO 4: Digital twin ── */}
                <section className="mt-16 border-t border-white/[0.06] pt-16">
                    <DemoHeader index="04 · Digital Twin Simulator" title="Seven dials, one performance profile">
                        Set the operational parameters and the equations compute the company's{' '}
                        <span className="font-semibold text-sky-400">performance profile</span> in real time, so management sees
                        the whole picture before deciding.
                    </DemoHeader>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        <div className="space-y-6 lg:col-span-1">
                            <Card className="space-y-6">
                                <CardTitle>Operations</CardTitle>
                                <Slider compact label="Capacity Utilization" display={`${capacityUsed}%`} value={capacityUsed} min={0} max={100} step={1}
                                    onChange={setCapacityUsed} accent="sky" hint="% of total plant capacity in use" />
                                <Slider compact label="Labor Efficiency" display={`${laborEfficiency}%`} value={laborEfficiency} min={0} max={100} step={1}
                                    onChange={setLaborEfficiency} accent="sky" hint="Actual vs standard labor hours" />
                                <Slider compact label="Defect / Scrap Rate" display={`${defectRate}%`} value={defectRate} min={0} max={20} step={1}
                                    onChange={setDefectRate} accent="amber" hint="% of output rejected or scrapped" />
                                <Slider compact label="Production Floor Headcount" display={`${headcount} workers`} value={headcount} min={10} max={200} step={5}
                                    onChange={setHeadcount} accent="sky" hint="Active workers on the production floor" />
                            </Card>
                            <Card className="space-y-6">
                                <CardTitle>Commercial</CardTitle>
                                <Slider compact label="Customer On-Time Delivery" display={`${onTimeDelivery}%`} value={onTimeDelivery} min={0} max={100} step={1}
                                    onChange={setOnTimeDelivery} accent="emerald" hint="Orders delivered on or before due date" />
                                <Slider compact label="Supplier On-Time Delivery" display={`${supplierOTD}%`} value={supplierOTD} min={0} max={100} step={1}
                                    onChange={setSupplierOTD} accent="amber" hint="Inbound materials received on schedule" />
                                <Slider compact label="Material Cost Ratio" display={`${materialCostRatio}%`} value={materialCostRatio} min={10} max={70} step={1}
                                    onChange={setMaterialCostRatio} accent="amber" hint="Material cost as % of revenue" />
                            </Card>
                        </div>

                        <div className="space-y-6 lg:col-span-3">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                <div className="panel p-5 text-center">
                                    <p className="mb-2 font-mono text-xs text-zinc-500">OEE</p>
                                    <p className="font-mono text-3xl font-bold text-sky-400">{digitalTwinMetrics.oee}%</p>
                                    <p className="mt-1 text-xs text-zinc-600">Availability × Performance × Quality</p>
                                </div>
                                <div className="panel p-5 text-center">
                                    <p className="mb-2 font-mono text-xs text-zinc-500">Supplier OTD</p>
                                    <p className="font-mono text-3xl font-bold text-amber-400">{digitalTwinMetrics.supplierScore}%</p>
                                    <p className="mt-1 text-xs text-zinc-600">Inbound materials on schedule</p>
                                </div>
                                <div className="panel p-5 text-center">
                                    <p className="mb-2 font-mono text-xs text-zinc-500">Overall Health</p>
                                    <p className={`font-mono text-3xl font-bold ${twinHealthColor}`}>{digitalTwinMetrics.overallHealth}%</p>
                                    <p className="mt-1 text-xs text-zinc-600">Composite of all 7 metrics</p>
                                </div>
                                <div className="panel flex flex-col items-center justify-center p-5 text-center">
                                    <p className="mb-3 font-mono text-xs text-zinc-500">Status</p>
                                    <span className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${twinStatusBg}`}>
                                        {twinStatusLabel}
                                    </span>
                                </div>
                            </div>

                            <Card className="flex h-[400px] flex-col">
                                <div className="mb-2">
                                    <h3 className="font-display text-base font-semibold text-white">Company Performance Profile</h3>
                                    <p className="text-sm text-zinc-500">Each axis is 0–100. A larger shape means a healthier operation.</p>
                                </div>
                                <div className="flex-grow">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart data={digitalTwinMetrics.radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                                            <PolarGrid stroke={CHART.grid} />
                                            <PolarAngleAxis dataKey="metric" tick={axisTick} />
                                            <PolarRadiusAxis domain={[0, 100]} tick={{ fill: CHART.axis, fontSize: 10 }} tickCount={5} />
                                            <Radar dataKey="value" stroke={CHART.emerald} fill={CHART.emerald} fillOpacity={0.15} strokeWidth={2} />
                                            <RechartsTooltip contentStyle={tooltipStyle} labelStyle={{ color: CHART.tooltipLabel }}
                                                formatter={(value) => [`${value}%`, 'Score']} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductionPlanningDemo;
