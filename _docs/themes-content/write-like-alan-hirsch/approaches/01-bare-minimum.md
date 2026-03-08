# Approach 01: Bare Minimum (Zero-Shot)

## Custom GPT Instructions

```
Write like Alan Hirsch.
```

## What This Tests

This is the control. It tests what the LLM already knows about Alan Hirsch from its pre-training data. Any output here represents the baseline that all other approaches must exceed.

## Expected Strengths
- May capture general Christian leadership/missional tone
- Might reference some of Alan's well-known concepts if they appear in training data

## Expected Weaknesses
- No specific voice guidance
- Will likely produce generic Christian author voice
- Probably won't include specific frameworks (mDNA, APEST) with correct details
- No guardrails against antithesis patterns or failure modes
- No Christocentric anchoring requirement
- No structural patterns from Alan's actual writing

## Hypothesis
Score prediction: 15-30/100. The LLM may know *about* Alan Hirsch but cannot emulate his voice without guidance.
