from osrs.controllers.highscores import Highscores
from osrs.enums import AccountType
from osrs.exceptions import OutdatedError
from unittest import mock

import unittest


class TestHighscores(unittest.TestCase):
    """Test highscores controller"""

    @mock.patch("osrs.controllers.highscores.Highscores._call_highscores_api")
    def test_fail_retrieve_highscores(
        self,
        highscores_api_results: mock.MagicMock(),
    ):
        """Test fails when gets incorrect number of rows from response"""
        # Given
        highscores_controller = Highscores(
            username="testerboi", account_type=AccountType.NORMAL
        )
        highscores_api_results.return_value = """
        24422,2277,331473717
        """

        # When/Then
        with self.assertRaises(OutdatedError):
            highscores_controller.set_user_highscores()

    @mock.patch("osrs.controllers.highscores.Highscores._call_highscores_api")
    def test_retrieve_highscores(
        self,
        highscores_api_results: mock.MagicMock(),
    ):
        """Test assigns correct number of values for each category"""
        # Given
        highscores_controller = Highscores(
            username="testerboi", account_type=AccountType.NORMAL
        )
        highscores_api_results.return_value = """
            30920,2277,375780909
            61748,99,21077266
            123178,99,14737150
            133457,99,18397025
            79236,99,35611671
            91341,99,31448541
            55536,99,13094081
            101778,99,17614123
            114592,99,13437292
            24130,99,16413591
            109166,99,13080298
            64006,99,13196468
            81060,99,13456449
            14230,99,15202226
            35796,99,13209608
            20233,99,15195980
            39471,99,13190554
            38086,99,13200276
            68062,99,13340252
            43886,99,16942459
            143500,99,13388055
            23208,99,13629413
            30066,99,13861773
            65223,99,13056358
            -1,-1
            -1,-1
            -1,-1
            -1,-1
            -1,-1
            198647,231
            631918,4
            617650,6
            224971,48
            177146,110
            59087,52
            116290,11
            -1,-1
            -1,-1
            -1,-1
            302765,33
            42466,531
            57760,922
            -1,-1
            289494,155
            105096,9
            100590,50
            85947,5
            83704,626
            163612,38
            -1,-1
            76242,50
            87346,50
            53798,253
            130000,25
            117137,50
            114178,203
            155530,224
            111066,212
            33467,50
            1111,10
            117628,256
            231751,50
            31063,402
            43984,109
            112112,82
            136308,226
            91803,2107
            80927,100
            14559,488
            31590,5
            66259,100
            54050,30
            -1,-1
            204034,5
            35441,108
            114806,53
            29007,150
            20136,63
            -1,-1
            14302,438
            21724,78
            30727,406
            -1,-1
            1111,27
            -1,-1
            -1,-1
            135344,263
            44540,80
            24504,104
            -1,-1
            -1,-1
            111,14
            95084,52
            43049,76
            125096,544
            145980,552
            58915,150
            177618,427
        """

        # When
        highscores_controller.set_user_highscores()

        # Then
        self.assertEqual(len(highscores_controller.bosses.to_json()), 58)
        self.assertEqual(len(highscores_controller.minigames.to_json()), 16)
        self.assertEqual(len(highscores_controller.skills.to_json()), 23)
