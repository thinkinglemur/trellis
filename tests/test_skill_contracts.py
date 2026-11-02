"""Structural contract checks only: not runtime/agent behavioural conformance."""
import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


class SkillContracts(unittest.TestCase):
    def test_skill_names_and_local_references(self):
        skills = list((ROOT / 'skills').glob('*/SKILL.md'))
        self.assertEqual(len(skills), 17)
        for skill in skills:
            text = skill.read_text()
            self.assertTrue(text.startswith('---\n'), str(skill))
            front = text.split('---', 2)[1]
            self.assertIn('name: ' + skill.parent.name, front)
            self.assertNotIn('<', front)
        for relative in (
            'skills/trellis-product-definition/references/discovery-interview.md',
            'skills/trellis-factory/references/loops.md',
            'templates/DISCOVERY.md', 'templates/WORK-PACKET.md', 'templates/RUN.md',
            'docs/discovery-and-factory-supplement.md',
        ):
            self.assertTrue((ROOT / relative).is_file(), relative)

    def test_router_and_discovery_entry_points(self):
        router = (ROOT / 'skills/trellis/SKILL.md').read_text()
        definition = (ROOT / 'skills/trellis-product-definition/SKILL.md').read_text()
        self.assertIn('trellis-factory', router)
        self.assertIn('references/discovery-interview.md', definition)

    def test_factory_delegates_preserve_acceptance_ownership(self):
        for name in ('trellis-module-session', 'trellis-module-coordinator'):
            text = (ROOT / 'skills' / name / 'SKILL.md').read_text()
            self.assertIn('## Factory delegation override', text)
            self.assertIn('independent review', text)
            self.assertIn('do not', text)
            self.assertIn('TICKETS.md', text)

    def test_plugin_version(self):
        plugin = json.loads((ROOT / '.claude-plugin/plugin.json').read_text())
        self.assertEqual(plugin['version'], '0.6.0')


if __name__ == '__main__':
    unittest.main()
