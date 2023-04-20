# Changed Files Action

## Troubleshooting

### Error on run action
```bash
fatal: ambiguous argument 'HEAD~1': unknown revision or path not in the working tree.
```

Ensure if the checkout action has `fetch-depth` option are 2

```yaml
steps:
  - uses: actions/checkout@v3
    with:
      fetch-depth: 2
```