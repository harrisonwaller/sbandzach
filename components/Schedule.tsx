import { schedule } from "@/content/schedule";
import { Reveal } from "@/components/Reveal";

/**
 * Chapter II — The Weekend. Set on ink, typeset like a printed program rather
 * than a grid of cards. Days are marked in roman numerals.
 */
export function Schedule() {
  return (
    <section id="weekend" className="bg-ink text-cream">
      <div className="mx-auto max-w-[900px] px-6 py-[var(--section-y)] sm:px-10">
        <Reveal>
          <p className="chapter-mark" style={{ color: "var(--gold-soft)" }}>
            Chapter II
          </p>
          <h2 className="chapter-title" style={{ color: "var(--cream)" }}>
            The <em style={{ color: "var(--gold-soft)" }}>weekend</em>.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-16">
          {schedule.map((day) => (
            <Reveal key={day.dateRoman} as="div">
              <div
                className="mb-8 border-b pb-4 font-display text-[0.95rem] uppercase"
                style={{
                  color: "var(--gold-soft)",
                  letterSpacing: "0.45em",
                  textIndent: "0.45em",
                  borderColor: "var(--rule-light)",
                }}
              >
                {day.weekday} · {day.dateRoman}
              </div>

              <div>
                {day.events.map((ev, i) => (
                  <div
                    key={ev.title}
                    className="grid gap-2 py-8 sm:grid-cols-[200px_1fr] sm:gap-12"
                    style={{
                      borderBottom:
                        i < day.events.length - 1
                          ? "1px solid var(--rule-light)"
                          : "none",
                    }}
                  >
                    <div
                      className="font-serif text-[1.15rem] italic sm:border-r sm:pr-12 sm:text-right"
                      style={{
                        color: "var(--gold-soft)",
                        letterSpacing: "0.04em",
                        borderColor: "var(--rule-light)",
                      }}
                    >
                      {ev.time}
                    </div>
                    <div>
                      <h3 className="font-display text-[1.6rem] leading-tight text-cream sm:text-[1.8rem]">
                        {ev.title}
                      </h3>
                      <p className="mt-2 font-serif text-[1.05rem] text-cream/70">
                        {ev.venue}
                      </p>
                      <p className="font-serif text-[0.95rem] italic text-cream/45">
                        {ev.address}
                      </p>
                      {ev.attire && (
                        <p
                          className="mt-3 font-display text-[0.7rem] uppercase"
                          style={{
                            color: "var(--gold-soft)",
                            letterSpacing: "0.4em",
                            textIndent: "0.4em",
                          }}
                        >
                          {ev.attire}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
