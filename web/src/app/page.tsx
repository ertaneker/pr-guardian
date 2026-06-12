import { Shield, Zap, GitPullRequest, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-[#13132b] border border-[#2a2a4a] rounded-full px-4 py-1.5 text-sm text-[#00d4ff] mb-8">
          <Zap size={14} />
          Now on GitHub Marketplace
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Don&apos;t just review code.
          <br />
          <span className="bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] bg-clip-text text-transparent">
            Protect production.
          </span>
        </h1>

        <p className="text-lg text-[#8888aa] max-w-2xl mx-auto mb-10">
          PR Shield is an AI-powered GitHub Action that answers the critical question every
          developer has before merging: &quot;What could this PR break in production?&quot;
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="https://github.com/ertaneker/pr-guardian"
            className="bg-[#7b2fff] hover:bg-[#6a1fff] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Install on GitHub
          </a>
          <a
            href="https://github.com/ertaneker/pr-guardian/blob/main/docs/USAGE.md"
            className="border border-[#2a2a4a] hover:border-[#4a4a6a] text-[#e4e4f0] px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Documentation →
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Shield className="text-[#00d4ff]" size={24} />,
              title: 'Production Risk Score',
              desc: 'Every PR gets a 1-10 risk score. Know before you merge if this will break something.',
            },
            {
              icon: <GitPullRequest className="text-[#7b2fff]" size={24} />,
              title: 'AI + Deterministic Checks',
              desc: 'DeepSeek AI combined with rule-based checks for DB migrations, API contracts, and config drift.',
            },
            {
              icon: <CheckCircle className="text-[#00d4ff]" size={24} />,
              title: '2-Minute Setup',
              desc: 'One YAML file. One secret. PR Shield starts reviewing your PRs immediately.',
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-[#13132b] border border-[#1e1e3a] rounded-xl p-6 hover:border-[#2a2a5a] transition-colors"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-[#8888aa] text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { name: 'Free', price: '$0', desc: 'Public repos, 50 PR/month' },
            { name: 'Team', price: '$29', desc: '5 private repos, unlimited PRs' },
            { name: 'Pro', price: '$79', desc: 'Unlimited everything, CI/CD, Slack' },
            { name: 'Enterprise', price: '$299', desc: 'Self-hosted, SSO, audit logs' },
          ].map((p) => (
            <div
              key={p.name}
              className="bg-[#13132b] border border-[#1e1e3a] rounded-xl p-6 text-center hover:border-[#7b2fff] transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
              <div className="text-3xl font-bold mb-1">{p.price}</div>
              <div className="text-xs text-[#8888aa] mb-3">per month</div>
              <p className="text-[#8888aa] text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 pb-12 text-center text-sm text-[#555588]">
        <a href="https://github.com/ertaneker/pr-guardian" className="hover:text-[#8888aa] transition-colors">
          github.com/ertaneker/pr-guardian
        </a>
        <span className="mx-2">·</span>
        MIT Licensed
      </footer>
    </main>
  );
}
