"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
  }
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-[#94a3b8] [&_.recharts-cartesian-grid_line]:stroke-[#4ADE80]/20 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-[#4ADE80] [&_.recharts-dot]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid]:stroke-[#4ADE80]/20 [&_.recharts-radial-bar-background-sector]:fill-[#22C55E]/20 [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-[#22C55E]/20 [&_.recharts-reference-line]:stroke-[#4ADE80]/20 [&_.recharts-sector]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
    }
>(({ active, payload, className, indicator = "dot", hideIndicator = false, color, nameKey }, ref) => {
  const { config } = useChart()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-[#4ADE80]/20 bg-[#0F172A] px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.name || item.dataKey || "value"}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)
        const indicatorColor = color || item.payload?.fill || item.color

        return (
          <div
            key={item.dataKey}
            className={cn("flex w-full flex-wrap items-stretch gap-2", indicator === "dot" && "items-center")}
          >
            {!hideIndicator && (
              <div
                className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                  "h-2.5 w-2.5": indicator === "dot",
                  "w-1": indicator === "line",
                  "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                })}
                style={
                  {
                    "--color-bg": indicatorColor,
                    "--color-border": indicatorColor,
                  } as React.CSSProperties
                }
              />
            )}
            <div className="flex flex-1 justify-between leading-none">
              <span className="text-[#94a3b8]">{itemConfig?.label || item.name}</span>
              {item.value && <span className="font-mono font-medium text-white">{item.value.toLocaleString()}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config]
}

const ChartStyle = ({ id }: { id: string }) => {
  return (
    <style jsx>{`
      #${id} .recharts-cartesian-axis-tick-value {
        font-size: 10px;
      }
    `}</style>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend }